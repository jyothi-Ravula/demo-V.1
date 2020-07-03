import { Component, ElementRef, OnInit, Renderer2, ViewChild,Inject } from '@angular/core';
import { MatDialog, MatDialogConfig,  MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
    
  @ViewChild('video') videoElement: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
    videoWidth = 0;
    videoHeight = 0;
    cam : any;
    title : string;
    capturedImage : string;
    counter = 0;
    //var ab;
    constraints = {
        video: {
            facingMode: "environment",
            //width: { ideal: 800, },
            //height: { ideal: 600 }
        }
    };
  
  constructor(private renderer: Renderer2,
  private dialogRef: MatDialogRef<PhotoComponent>,
  @Inject(MAT_DIALOG_DATA) data)
  {
    this.title = data.title;
   }
  ngOnInit() {
     this.startCamera();
  }

  // start Camera
  startCamera() {
        if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
            navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
        } else {
            alert('Sorry, camera not available.');
        }
    }

    attachVideo(stream) {
        this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
        this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
            this.videoHeight = this.videoElement.nativeElement.videoHeight;
            this.videoWidth = this.videoElement.nativeElement.videoWidth;
        });
    }

    // To Capture the Image  
    capture() {
       this.counter = this.counter+1;
        this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
        this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
        this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
        this.capturedImage = this.canvas.nativeElement.toDataURL('image/jpeg', 1.0);
        console.log(this.canvas.nativeElement.toDataURL())
        if(this.capturedImage != null && this.counter == 1){
            this.stopCapturing();
        }
        else{
          this.counter =0;
          this.startCamera();
            // alert('Please click on Take Photo to capture again.');
            // this.dialogCancel();
        }
    }

    saveImge(){
      this.dialogRef.close(this.capturedImage);
    }

    //stop the webcam after capturing;
    stopCapturing(){
        this.cam = this.videoElement.nativeElement;
        this.cam.pause();
        var videoStream = this.cam.srcObject;
        var tracks = videoStream.getTracks();
        if(tracks.length>-1){
          tracks[0].stop();
        }
        this.cam.srcObject = null;
    }

    handleError(error) {
        console.log('Error: ', error);
    }

  dialogCancel() {
    this.dialogRef.close("close");
      console.log('capturedImage',this.capturedImage);
       if(this.capturedImage == undefined){
        this.stopCapturing();
      }
      this.sendCapturedImage()


    /* this.dialogRef.close();
    console.log('capturedImage',this.capturedImage);
    this.stopCapturing(); */
  }
 
  sendCapturedImage(){
      if(this.capturedImage != undefined){
        this.dialogRef.close(this.capturedImage);
      }
    }


}
