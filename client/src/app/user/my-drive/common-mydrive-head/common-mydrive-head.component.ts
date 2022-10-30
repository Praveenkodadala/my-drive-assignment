import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpService } from '../../../../app/services/http/http.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { NzNotificationService } from 'ng-zorro-antd/notification'

@Component({
  selector: 'app-common-mydrive-head',
  templateUrl: './common-mydrive-head.component.html',
  styleUrls: ['./common-mydrive-head.component.css'],
 
})
export class CommonMydriveHeadComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>()


  userData: any = {}
  isSpinning = false
  addFolderForm: any
  addDocForm: any
  nested: boolean = false
  folder_id:any
  fileToUpload: any
  isVisibleFolder = false
  isVisibleDoc = false
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private services: HttpService,
    private notification: NzNotificationService,

  ) {

    this.userData = this.services.userData
    console.log("this.userData", this.userData)

    console.log("route.snapshot.url[0].path", route.snapshot.url)

    if (route.snapshot.url[0].path == 'folder') {
      this.nested = true
      console.log('NESTED')
      this.route.queryParams.subscribe(params => {
        this.folder_id = params['folderId']
      })
    }
   }

   ngOnInit(): void {
   

    this.addFolderForm = this.fb.group({
      nested: [false],
      name: [null],
    })

    this.addDocForm = this.fb.group({
      file: [''],
      nested: [false],
      nested_inside: [''],
  
    })
  }

  handleFileInput(event:any) {
  //  console.log("event.target.files", event.target.files)
    this.fileToUpload = event.target.files[0]
    console.log('this.fileToUpload', this.fileToUpload)
  }

  showModalFolder(): void {
    this.isVisibleFolder = true
  }

  okFolder(): void {

    if (this.nested == true) {
      this.addFolderForm.patchValue({ nested: true })
      this.addFolderForm.value.nested_inside = this.folder_id
    } else {
      this.addFolderForm.patchValue({ nested: false })
    }

    console.log("this.addFolderForm.value", this.addFolderForm.value)


    const request = {
      params: this.addFolderForm.value,
      method: 'POST',
      action_url: 'mydrive/addFolder',
    }
    this.services.doHttp1(request)?.subscribe(
      (res: any) => {
        if (res.status) {
          this.notification.create('success', 'Success!', res.msg, { nzPlacement: 'bottomRight' })
          this.addFolderForm.reset()
          //this.newItemEvent.emit()
          this.isVisibleFolder = false
        }
      },
      (error: any) => {
        this.notification.create('error', 'Failed', error.error.msg, {
          nzPlacement: 'bottomRight',
        })
        //console.log(error)
      },
    )
  }
  cancelFolder(): void {
    this.isVisibleFolder = false
    this.addFolderForm.reset()
  }

  showModalDoc(): void {
    this.isVisibleDoc = true
  }

  okDoc(): void {

    console.log("this.addFolderForm.value", this.addFolderForm.value)
 

    if (this.nested == true) {
      this.addDocForm.patchValue({ nested: true })
      this.addDocForm.value.nested_inside = this.folder_id
    }
    if (this.nested == false) {
      this.addDocForm.patchValue({ nested: false })
    }

    const formData = new FormData()
    formData.append('file', this.fileToUpload)
    formData.append('creator', this.userData.userId)
    formData.append('nested', this.addDocForm.value.nested)

    if (this.nested == true) {
      formData.append('nested_inside', this.addDocForm.value.nested_inside)
    }
    console.log("this.addFolderForm.value", this.addFolderForm.value)

    const request = {
      params: formData,
      method: 'POST',
      action_url: 'mydrive/addDocument',
    }

    this.services.doHttp1(request)?.subscribe(
      (res: any) => {
        if (res.status) {
          this.notification.create('success', 'Success!', res.msg, { nzPlacement: 'bottomRight' })
          this.isVisibleDoc = false
          this.addDocForm.reset()
          //this.newItemEvent.emit()
        }
      },
      (error: any) => {
        this.notification.create('error', 'Failed', error.error.msg, {
          nzPlacement: 'bottomRight',
        })
        // console.log('error', error)
      },
    )


  }
  cancelDoc(): void {
    this.isVisibleDoc = false
    this.addDocForm.reset()
  }




}
