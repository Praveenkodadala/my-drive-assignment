import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpService } from '../../../../app/services/http/http.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-mydrive-folder-view',
  templateUrl: './mydrive-folder-view.component.html',
  styleUrls: ['./mydrive-folder-view.component.css'],
})
export class MydriveFolderViewComponent implements OnInit {
  folder_id: any;
  folders: any = [];
  documents: any = [];
  listOfData: any = [];
  listOfDisplayData: any;
  viewUrl: any;
  isVisible = false;
  folderName:string=''


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private route: ActivatedRoute,
    private services: HttpService
  ) {

  }

  ngOnInit() {
    //console.log("this.folderId at ng on it", this.folder_id)
    this.route.queryParams.subscribe((params: any) => {
      // console.log('params', params)
      this.folder_id = params.folderId;
      console.log('this.folderId', this.folder_id);
      this.getFolderName(this.folder_id )
      this.getFolderItems();
    });

    
  }

  updateDashboard() {
    this.getFolderItems();
  }

  getFolderItems() {
    this.listOfData = [];
    const request = {
      method: 'GET',
      action_url: 'mydrive/folderItems?folder_id=' + this.folder_id,
    };
    this.services.doHttp1(request)?.subscribe(
      (res: any) => {
        if (res.status) {
          this.folders = res['data'].folders;
          this.documents = res['data'].documents;
          this.listOfData = this.folders.concat(this.documents);
          this.documents.forEach((doc: any) => {
            doc.doc = 'doc';
            this.listOfData = this.folders.concat(this.documents);
          });
          this.listOfDisplayData = this.listOfData;
          console.log('this.listOfDisplayData', this.listOfDisplayData); //main data to display in table
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  redirectFolder(folder_id: any) {
    this.router.navigate(['/user/my-drive/folder/'], {
      queryParams: { folderId: folder_id, refresh: new Date().getTime() },
    });
  }

  getSignedUrl(path: any) {
    console.log('docPath', path);

    const request = {
      params: { path: path },
      method: 'POST',
      action_url: 'mydrive/get_signed_url',
    };

    this.services.doHttp(request)?.subscribe(
      (res: any) => {
        if (res.status) {
          this.viewUrl = res.signed_url;
          // console.log('this.viewUrl', this.viewUrl)
          if (this.viewUrl) {
            this.isVisible = true;
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleOk() {
    this.isVisible = false;
  }

  deleteNested(id: any) {
    // console.log('delete id', id)
    const request = {
      params: { id: id },
      method: 'POST',
      action_url: 'mydrive/delete_file_nested',
    };

    this.services.doHttp(request)?.subscribe(
      (res: any) => {
        if (res.status) {
          this.getFolderItems();
          this.notification.create('success', 'Success!', res.msg, {
            nzPlacement: 'bottomRight',
          });
        }
      },
      (error: any) => {
        this.notification.create('error', 'Failed', error.error.msg, {
          nzPlacement: 'bottomRight',
        });
        console.log(error);
      }
    );
  }

  cancelDelete(): void {
    // console.log('cancel clicked')
  }



  getFolderName(id:any){
    const request = {
      method: 'GET',
      action_url: 'mydrive/folderDetails?folder_id=' + id,
    };
    this.services.doHttp1(request)?.subscribe(
      (res: any) => {
        if (res.status) {
         this.folderName = res.data.name
        }
      },
      (error) => {
        console.log(error);
      }
    );


  }



}
