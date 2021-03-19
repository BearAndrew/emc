import { CdkDrag, CdkDragMove, CdkDropList, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';
import { ViewportRuler } from '@angular/cdk/overlay';
import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileCard } from '../../_ts/profile-card';
import { FirebaseService } from '../../_service/firebase.service';

@Component({
  selector: 'app-card-folder',
  templateUrl: './card-folder.component.html',
  styleUrls: ['./card-folder.component.scss']
})
export class CardFolderComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(CdkDropListGroup, {static: true}) listGroup: CdkDropListGroup<CdkDropList>;
  @ViewChild(CdkDropList, {static: true}) placeholder: CdkDropList;

  draggable = false;

  // public items: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  items: ProfileCard[];

  public target: CdkDropList;
  public targetIndex: number;
  public source: CdkDropList;
  public sourceIndex: number;
  public dragIndex: number;
  public activeContainer;

  profileCardSub: Subscription;
  filter = null;

  constructor(private viewportRuler: ViewportRuler,
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute) {
    this.target = null;
    this.source = null;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const folderId = params.get('folderId');
      console.log('folderId: ' + folderId);

      this.profileCardSub = this.firebaseService.getProfileCards(folderId).subscribe(
        (data) => {
          this.items = data;
          console.log('getProfileCards: ' + JSON.stringify(data));
        }
      );
    });
  }

  ngAfterViewInit() {
    const phElement = this.placeholder.element.nativeElement;

    phElement.style.display = 'none';
    phElement.parentElement.removeChild(phElement);
  }

  ngOnDestroy() {
    this.profileCardSub.unsubscribe();
  }


  routeToEdit(i: number) {
    this.router.navigate([i], { relativeTo: this.route });
  }


  add() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }


  dragMoved(e: CdkDragMove) {
    const point = this.getPointerPositionOnPage(e.event);

    this.listGroup._items.forEach(dropList => {
      if (__isInsideDropListClientRect(dropList, point.x, point.y)) {
        this.activeContainer = dropList;
        return;
      }
    });
  }

  dropListDropped() {
    if (!this.target) {
      return;
    }

    const phElement = this.placeholder.element.nativeElement;
    const parent = phElement.parentElement;

    phElement.style.display = 'none';

    parent.removeChild(phElement);
    parent.appendChild(phElement);
    parent.insertBefore(this.source.element.nativeElement, parent.children[this.sourceIndex]);

    this.target = null;
    this.source = null;

    if (this.sourceIndex !== this.targetIndex) {
      moveItemInArray(this.items, this.sourceIndex, this.targetIndex);
    }
  }

  dropListEnterPredicate = (drag: CdkDrag, drop: CdkDropList) => {
    if (drop === this.placeholder) {
      return true;
    }

    if (drop !== this.activeContainer) {
      return false;
    }

    const phElement = this.placeholder.element.nativeElement;
    const sourceElement = drag.dropContainer.element.nativeElement;
    const dropElement = drop.element.nativeElement;

    const dragIndex = __indexOf(dropElement.parentElement.children, (this.source ? phElement : sourceElement));
    const dropIndex = __indexOf(dropElement.parentElement.children, dropElement);

    if (!this.source) {
      this.sourceIndex = dragIndex;
      this.source = drag.dropContainer;

      phElement.style.width = sourceElement.clientWidth + 'px';
      phElement.style.height = sourceElement.clientHeight + 'px';

      sourceElement.parentElement.removeChild(sourceElement);
    }

    this.targetIndex = dropIndex;
    this.target = drop;

    phElement.style.display = '';
    dropElement.parentElement.insertBefore(phElement, (dropIndex > dragIndex
      ? dropElement.nextSibling : dropElement));

    this.placeholder.enterPredicate(drag, drop);
    return false;
  }

  /** Determines the point of the page that was touched by the user. */
  getPointerPositionOnPage(event: MouseEvent | TouchEvent) {
    // `touches` will be empty for start/end events so we have to fall back to `changedTouches`.
    const point = __isTouchEvent(event) ? (event.touches[0] || event.changedTouches[0]) : event;
        const scrollPosition = this.viewportRuler.getViewportScrollPosition();

        return {
            x: point.pageX - scrollPosition.left,
            y: point.pageY - scrollPosition.top
        };
    }

}


function __indexOf(collection, node) {
  return Array.prototype.indexOf.call(collection, node);
}

/** Determines whether an event is a touch event. */
function __isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
  return event.type.startsWith('touch');
}

function __isInsideDropListClientRect(dropList: CdkDropList, x: number, y: number) {
  const {top, bottom, left, right} = dropList.element.nativeElement.getBoundingClientRect();
  return y >= top && y <= bottom && x >= left && x <= right;
}
