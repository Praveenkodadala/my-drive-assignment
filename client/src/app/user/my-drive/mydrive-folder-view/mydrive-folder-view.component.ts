import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms'
import { HttpService } from '../../../../app/services/http/http.service'
import { NzNotificationService } from 'ng-zorro-antd/notification'

@Component({
  selector: 'app-mydrive-folder-view',
  templateUrl: './mydrive-folder-view.component.html',
  styleUrls: ['./mydrive-folder-view.component.css']
})
export class MydriveFolderViewComponent implements OnInit {
  isSpinning = false
  folder_id:any
  folders: any = []
  documents: any = []
  listOfData: any = []
  listOfDisplayData:any
  viewUrl:any
  isVisible = false

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private route: ActivatedRoute,
    private services: HttpService,
  ) {

  }

  addFolderRename: any
  ngOnInit() {
    //console.log("this.folderId at ng on it", this.folder_id)
    this.route.queryParams.subscribe((params:any) => {
      console.log('params', params)
      this.folder_id = params.folderId
      console.log('this.folderId', this.folder_id)
      this.getFolderItems()
    })

    this.addFolderRename = this.fb.group({
      nested: [false],
      name: [null],
    })
  }

  updateDashboard() {
    console.log('udate dashboard what')
    this.getFolderItems()
  }

  getFolderItems() {
    this.listOfData = []
    this.isSpinning = true
    const request = {
      method: 'GET',
      action_url: 'mydrive/folderItems?folder_id=' + this.folder_id,
    }
    this.services.doHttp1(request)?.subscribe(
      (res: any) => {
        if (res.status) {
          console.log("res['data']", res['data'])
          this.folders = res['data'].folders
          //  this.listOfData = this.folders
          this.documents = res['data'].documents
          this.listOfData = this.folders.concat(this.documents)
          this.documents.forEach((doc:any) => {
            doc.doc = 'doc'
            this.listOfData = this.folders.concat(this.documents)
          })
          this.listOfDisplayData = this.listOfData
          console.log('this.listOfDisplayData', this.listOfDisplayData)
          this.isSpinning = false
        }
      },
      error => {
        this.isSpinning = false
      },
    )
  }



  redirectFolder(folder_id:any) {
    console.log('folder_id', folder_id)
    this.router.navigate(['/user/my-drive/folder/'], {
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
  //   this.services.doHttp(request)?.subscribe(
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
  //   this.services.doHttp1(request).subscribe(
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

  deleteNested(id:any) {
    console.log('delete id', id)
    this.isSpinning = true
    const request = {
      params: { id: id },
      method: 'POST',
      action_url: 'mydrive/delete_file_nested',
    }
    console.log('request', request)
    this.services.doHttp(request)?.subscribe(
      (res: any) => {
        if (res.status) {
          this.notification.create('success', 'Success!', res.msg, { nzPlacement: 'bottomRight' })
          this.getFolderItems()
          window.location.reload()
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
  folderNameToRename:any
  showModalAction(id:any, name:any): void {
    this.folderNameToRename = name
    console.log('folderNameToRename', this.folderNameToRename)

    this.addFolderRename.patchValue({ name: this.folderNameToRename })

    this.folderId = id
    console.log('this.folderId ', this.folderId)
    this.isVisibleAction = true
  }
  handleCancelAction() {
    this.isVisibleAction = false
  }

  okFolderRename() {
    this.isVisibleAction = false
    this.isSpinning = true

    console.log(this.addFolderRename.value)

    const request = {
      params: this.addFolderRename.value,
      method: 'POST',
      action_url: `mydrive/folder_rename_nested/${this.folderId}`,
    }
    console.log('request', request)
    this.services.doHttp1(request)?.subscribe(
      (res: any) => {
        if (res.status) {
          this.notification.create('success', 'Success!', res.msg, { nzPlacement: 'bottomRight' })
          this.isSpinning = false
          this.isVisibleAction = false
          this.getFolderItems()
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
  folderDataForMove: any = []
  moveDocTo(id:any) {
    this.movableDocId = id
    console.log('movableDocId', this.movableDocId)
    this.isSpinning = true

    const request = {
      method: 'GET',
      action_url: `mydrive/get_folders_to_move_doc_forNestedComponent/${this.movableDocId}`,
    }
    console.log('request', request)
    this.services.doHttp1(request)?.subscribe(
      (res: any) => {
        if (res.status) {
          let dashBoard = {
            //moving doc to dashboard
            creator: '',
            deleted: false,
            name: 'Move to Dashboard',
            nested: false,
            __v: 0,
            _id: '123',
          }
          res.data.unshift(dashBoard)
          console.log('res.data', res.data)
          this.folderDataForMove = res.data
          // this.folderDataForMove.unshift(dashBoard)

          console.log(' this.folderDataForMove', this.folderDataForMove)
          this.isVisiblMoveDocToFolders = true
          this.isSpinning = false
          this.getFolderItems()
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
    //used in 2 componets
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
          this.getFolderItems()
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
    this.folderDataForMove = []
    this.movableFolderId = id
    console.log('movableFolderId', this.movableFolderId)
    this.isSpinning = true
    const request = {
      method: 'GET',
      action_url: `mydrive/get_folders_to_move_folder_forNestedComponent/${this.movableFolderId}`,
    }
    console.log('request', request)
    this.services.doHttp1(request)?.subscribe(
      (res: any) => {
        if (res.status) {
          const seen = new Set() //to remove ducplicate folder names (from db we are getting dup data bcz of for loop) (The Set constructor lets you create Set objects that store unique values of any type, )
          this.folderDataForMove = res.data.filter((el:any) => {
            const duplicate = seen.has(el._id)
            seen.add(el._id)
            return !duplicate
          })

          let dashBoard = {
            //moving folder to dashboard
            creator: '',
            deleted: false,
            name: 'Move to Dashboard',
            nested: false,
            __v: 0,
            _id: '123',
          }
          this.folderDataForMove.unshift(dashBoard)
          console.log(' this.folderDataForMove', this.folderDataForMove)
          this.isVisiblMoveDocToFolders = true
          this.isSpinning = false
          this.getFolderItems()
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

  dropDownIdfun(id:any, doc:any, name:any) {
    this.folderNameToRename = name
    this.doc = false
    this.dropDownId = id

    if (doc == 'doc') {
      this.doc = true
    }
    console.log('this.doc', this.doc)
    console.log('dropDownId ', this.dropDownId)
    console.log('this.folderNameToRename at table', this.folderNameToRename)
  }

  cancelDelete(): void {
    console.log('cancel clicked')
  }

  renameHeaderFolder(id:any) {
    console.log('nested folder id for delete', id)
  }






}
