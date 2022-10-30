import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpService } from '../../../../app/services/http/http.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { NzNotificationService } from 'ng-zorro-antd/notification'

@Component({
  selector: 'app-mydrive-dashboard',
  templateUrl: './mydrive-dashboard.component.html',
  styleUrls: ['./mydrive-dashboard.component.css']
})
export class MydriveDashboardComponent implements OnInit {

  userData: any 
  isSpinning: boolean = false
  listOfData: any = []
  folderData:any
  docData:any
  viewUrl:any
  isVisible = false
  addFolderRename: any

  constructor( private fb: FormBuilder,
  
    private services: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NzNotificationService
    ) {

      this.userData = this.services.userData
      console.log("this.userData in main mydrive dash", this.userData)
      this.getFolders()

     }

     
     ngOnInit(): void {
       this.addFolderRename = this.fb.group({
         nested: [false],
         name: [null],
       })
     }

     updateDashboard() {
      console.log('udate dashboard is calling')
      this.getFolders()
    }

    
  getFolders() {
    this.isSpinning = true
    const request = {
      method: 'GET',
      action_url: 'mydrive/get_folders',
    }
    this.services.doHttp1(request)?.subscribe(
      (res: any) => {
        if (res.status) {
          console.log('folder data', res['data'])
          this.folderData = res['data']
          // this.listOfData = res['data']
          this.isSpinning = false
          this.getDocuments()
        }
      },
      error => {
        this.isSpinning = false
      },
    )
  }
  listOfDisplayData:any
  getDocuments() {
 
    const request = {
      method: 'GET',
      action_url: 'mydrive/get_documents',
    }
    this.services.doHttp1(request)?.subscribe(
      (res: any) => {
        if (res.status) {
          this.docData = res['data']
          console.log('doc data', this.docData)
          this.listOfData = this.folderData.concat(this.docData)
          this.docData.forEach((doc:any) => {
            doc.doc = 'doc'
            this.listOfData = this.folderData.concat(this.docData)
          })
          console.log('data after doc', this.docData)

          this.listOfDisplayData = [...this.listOfData]

          console.log('listOfDisplayData', this.listOfDisplayData)
   
        }
      },
      error => {
        console.log(error)
      },
    )
  }

  redirectFolder(folder_id:any) {
    console.log('folder_id', folder_id)
    this.router.navigate(['/user/mydrive/folder/'], {
      queryParams: { folderId: folder_id, refresh: new Date().getTime() },
    })
  }

  DocNameOnPopUp = ''
  // getSignedUrl(path, name) {
  //   this.DocNameOnPopUp = name
  //   console.log('docPath', path)
  //   console.log('doc name', name)
  //   const request = {
  //     params: { path: path },
  //     method: 'POST',
  //     action_url: 'mydrive/get_signed_url',
  //   }
  //   console.log('request', request)
  //   this.services.doHttp(request).subscribe(
  //     (res: any) => {
  //       if (res.status) {
  //         this.viewUrl = res.signed_url
  //         console.log('this.viewUrl', this.viewUrl)
  //         if (this.viewUrl) {
  //           this.isVisible = true
  //         }
  //       }
  //     },
  //     error => {},
  //   )
  // }

  // download(path, name) {
  //   // this.isSpinning = true
  //   console.log('download path', path)
  //   const request = {
  //     params: { path: path },
  //     method: 'POST',
  //     action_url: 'mydrive/downloadDoc',
  //   }
  //   this.services.doHttp1(request)?.subscribe(
  //     (res: any) => {
  //       if (res.status) {
  //         this.isSpinning = false
  //       }
  //     },
  //     (error: any) => {
  //       //  this.spinner.hide()
  //       // this.notification.notify('error', 'internal server error')
  //       console.log(error)
  //     },
  //   )
  // }

  handleCancel(): void {
    console.log('Button cancel clicked!')
    this.isVisible = false
  }

  handleOk() {
    this.isVisible = false
  }

  delete(id:any) {
    console.log('delete id', id)
    this.isSpinning = true
    const request = {
      params: { id: id },
      method: 'POST',
      action_url: 'mydrive/delete_file_atDash',
    }
    console.log('request', request)
    this.services.doHttp(request)?.subscribe(
      (res: any) => {
        if (res.status) {
          this.notification.create('success', 'Success!', res.msg, { nzPlacement: 'bottomRight' })
          this.getFolders()
          this.isSpinning = false
        }
      },
      (error: any) => {
        this.isSpinning = false
        this.notification.create('error', 'Failed', error.error.msg, {
          nzPlacement: 'bottomRight',
        })
        console.log(error)
      },
    )
  }

  isVisibleAction = false
  folderId:any
  showModalAction(id:any, name:any): void {
    this.folderNameToRename = name
    this.folderId = id
    this.isVisibleAction = true
    this.addFolderRename.patchValue({ name: this.folderNameToRename })
  }
  handleCancelAction() {
    this.isVisibleAction = false
  }

  submitFolderRename() {
    this.isSpinning = true

    console.log(this.addFolderRename.value)

    const request = {
      params: this.addFolderRename.value,
      method: 'POST',
      action_url: `mydrive/folder_rename_atDash/${this.folderId}`,
    }
    console.log('request', request)
    this.services.doHttp1(request)?.subscribe(
      (res: any) => {
        if (res.status) {
          this.notification.create('success', 'Success!', res.msg, { nzPlacement: 'bottomRight' })
          this.isSpinning = false
          this.isVisibleAction = false
          this.getFolders()
          this.addFolderRename.reset()
        }
      },
      (error: any) => {
        this.isSpinning = false
        this.notification.create('error', 'Failed', error.error.msg, {
          nzPlacement: 'bottomRight',
        })
        console.log(error)
      },
    )
  }

  movableDocId:any
  folderDataforDoc: any = []
  moveDocTo(id:any) {
    // if(identifier == 'folder'){

    // }

    this.movableDocId = id
    console.log('movableDocId', this.movableDocId)
    this.isSpinning = true

    const request = {
      method: 'GET',
      action_url: `mydrive/get_folders_to_move_doc/${this.movableDocId}`,
    }
    console.log('request', request)
    this.services.doHttp1(request)?.subscribe(
      (res: any) => {
        if (res.status) {
          this.folderDataforDoc = res.data
          console.log(' this.folderDataforDoc', this.folderDataforDoc)
          this.isVisiblMoveDocToFolders = true
          this.isSpinning = false
          this.getFolders()
        }
      },
      (error: any) => {
        this.isSpinning = false
        this.notification.create('error', 'Failed', error.error.msg, {
          nzPlacement: 'bottomRight',
        })
        console.log(error)
      },
    )
  }

  isVisiblMoveDocToFolders = false
  showModalMoveDocToFolders(id:any): void {
    this.isVisiblMoveDocToFolders = true
  }
  CancelMoveDocToFolders() {
    this.isVisiblMoveDocToFolders = false
  }

  selectedFolderForMove(id:any) {
    //for moving docs and folders
    console.log('movableDocId  at seleted folder', this.movableDocId)
    console.log('selectedFolderForDocToMove  id', id)

    this.isSpinning = true
    const request = {
      params: {
        movableDocId: this.movableDocId,
        movableFolderId: this.movableFolderId,
        folderIdForMove: id,
      },
      method: 'POST',
      action_url: 'mydrive/selected_folder_for_Move',
    }
    console.log('request', request)
    this.services.doHttp1(request)?.subscribe(
      (res: any) => {
        if (res.status) {
          this.notification.create('success', 'Success!', res.msg, { nzPlacement: 'bottomRight' })
          this.isSpinning = false
          this.isVisiblMoveDocToFolders = false
          this.getFolders()
        }
      },
      (error: any) => {
        this.isSpinning = false
        this.notification.create('error', 'Failed', error.error.msg, {
          nzPlacement: 'bottomRight',
        })
        console.log(error)
      },
    )
  }

  movableFolderId:any
  moveFolderTo(id:any) {
    this.folderDataforDoc = []
    //this.isVisiblMoveDocToFolders = true
    this.movableFolderId = id
    console.log('movableFolderId', this.movableFolderId)
    this.isSpinning = true
    const request = {
      method: 'GET',
      action_url: `mydrive/get_folders_to_move_folder/${this.movableFolderId}`,
    }
    console.log('request', request)
    this.services.doHttp1(request)?.subscribe(
      (res: any) => {
        if (res.status) {
          // this.folderDataforDoc = res.data

          const seen = new Set() //to remove ducplicate folder names (from db we are getting dup data bcz of for loop) (The Set constructor lets you create Set objects that store unique values of any type, )
          this.folderDataforDoc = res.data.filter((el:any) => {
            const duplicate = seen.has(el._id)
            seen.add(el._id)
            return !duplicate
          })

          console.log(' this.folderDataforDoc', this.folderDataforDoc)
          this.isVisiblMoveDocToFolders = true
          this.isSpinning = false
          this.getFolders()
        }
      },
      (error: any) => {
        this.isSpinning = false
        this.notification.create('error', 'Failed', error.error.msg, {
          nzPlacement: 'bottomRight',
        })
        console.log(error)
      },
    )
  }

  dropDownId:any
  doc = false
  folderNameToRename:any
  dropDownIdfun(id:any, doc:any, name:any) {
    this.folderNameToRename = name
    this.doc = false
    this.dropDownId = id

    if (doc == 'doc') {
      this.doc = true
    }
    console.log('this.doc', this.doc)
    console.log('dropDownId ', this.dropDownId)
  }

  cancelDelete(): void {
    console.log('cancel clicked')
  }
   

}
