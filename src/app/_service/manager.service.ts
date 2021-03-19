import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private messageService: MessageService) { }

  //#region toast
  // 成功提示
  SuccessToast(detail: string, summary: string = '成功') {
    this.CustomToast(detail, summary, 'success');
  }

  // 一般提示
  InfoToast(detail: string, summary: string = '提示') {
    this.CustomToast(detail, summary, 'info', 3000);
  }

  // 錯誤提示
  ErrorToast(detail: string, summary: string = '錯誤') {
    this.CustomToast(detail, summary, 'error', 8000);
  }

  // 警告提示
  WarningToast(detail: string, summary: string = '提示') {
    this.CustomToast(detail, summary, 'warn');
  }

  // 自定義提示
  CustomToast(detail: string, summary: string, severity: string = 'info', life: number = 5000, sticky: boolean = false) {
    // Severity level of the message, valid values are 'success', 'info', 'warn' and 'error'.
    this.messageService.add({ key: 'toast', detail: detail, summary: summary, severity: severity, life: life, sticky: sticky });
  }

  // 清除所有提示
  ClearToast() {
    this.messageService.clear();
  }
  //#endregion



  domainUrl() {
    if (window.location.host.includes('localhost')) {
      return 'http://' + window.location.host + '/#/';
    } else {
      return 'https://' + window.location.host + '/emc/#/';
    }
  }



  // 檢查Email格式
  ValidateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
