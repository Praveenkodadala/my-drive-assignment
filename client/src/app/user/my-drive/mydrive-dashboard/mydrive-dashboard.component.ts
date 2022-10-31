import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpService } from '../../../../app/services/http/http.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { userEnvironment } from '../../../../environments/environment'

@Component({
  selector: 'app-mydrive-dashboard',
  templateUrl: './mydrive-dashboard.component.html',
  styleUrls: ['./mydrive-dashboard.component.css']
})
export class MydriveDashboardComponent implements OnInit {

  userData: any 

  listOfData: any = []
  folderData:any
  docData:any
  viewUrl:any
  isVisible = false
  listOfDisplayData:any =[]

  constructor( private fb: FormBuilder,
  
    private services: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NzNotificationService
    ) {
      this.userData = this.services.userData
      this.getFolders()
     }

     
     ngOnInit(): void {
     
     }

     updateDashboard() {
      this.getFolders()
    }

    
  getFolders() {
    const request = {
      method: 'GET',
      action_url: 'mydrive/get_folders',
    }
    this.services.doHttp1(request)?.subscribe(
      (res: any) => {
        if (res.status) {
          this.folderData = res['data'].reverse()
      
          this.getDocuments()
        }
      },
      error => {
        console.log(error)
      },
    )
  }
 
  getDocuments() {
    const request = {
      method: 'GET',
      action_url: 'mydrive/get_documents',
    }
    this.services.doHttp1(request)?.subscribe(
      (res: any) => {
        if (res.status) {
     
          this.docData = res['data'].reverse()
          this.listOfData = this.folderData.concat(this.docData)
          this.docData.forEach((doc:any) => {
            doc.doc = 'doc'
            this.listOfData = this.folderData.concat(this.docData)
          })
          this.listOfDisplayData = [...this.listOfData]

          console.log('listOfDisplayData', this.listOfDisplayData)  //main data to disply in table
   
        }
      },
      error => {
        console.log(error)
      },
    )
  }

  redirectFolder(folder_id:any) {
    this.router.navigate(['/user/my-drive/folder'], {
      queryParams: { folderId: folder_id, refresh: new Date().getTime() },
    })
  }


  viewDoc(path:any) {
     console.log('docPath', path)
     this.viewUrl = userEnvironment.baseURL + "/"+ path
     console.log(" this.viewUrl",  this.viewUrl)
        this.isVisible = true
  }



  handleCancel(): void {
    this.isVisible = false
  }

  handleOk() {
    this.isVisible = false
  }

  delete(id:any) {
    const request = {
      params: { id: id },
      method: 'POST',
      action_url: 'mydrive/delete_file_or_doc',
    }
    this.services.doHttp(request)?.subscribe(
      (res: any) => {
        if (res.status) {
          this.getFolders()
           this.notification.create('success', 'Success!', res.msg, { nzPlacement: 'bottomRight' })

        }
      },
      (error: any) => {
        this.notification.create('error', 'Failed', error.error.msg, {
          nzPlacement: 'bottomRight',
        })
        console.log(error)
      },
    )
  }

  cancelDelete(): void {
    //console.log('cancel clicked')
  }

 

   

}
