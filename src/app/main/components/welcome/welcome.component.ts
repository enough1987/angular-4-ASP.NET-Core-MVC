import { Component, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {


  @ViewChild("fileFoto") fileFoto: ElementRef;
  

  constructor() { 
    console.log(" constructor of welcome " );
  }


  clickFoto( fileFoto ): void{
    fileFoto.click();
    fileFoto.onChange = this.changeFotoEvent(fileFoto);
  }

  // http://blog.teamtreehouse.com/uploading-files-ajax
  private changeFotoEvent = (fileFoto)=>{
    console.log( " 1" , fileFoto );
    // Get the selected files from the input.
    let files = fileFoto.files;
    console.log(" ", files );
    // Create a new FormData object.
    let formData = new FormData();
    // Loop through each of the selected files.
    for (var i = 0; i < files.length; i++) {
      let file = files[i];
      console.log( file.type );
      // Check the file type.
      if (!file.type.match('image.*')) {
        continue;
      }
      console.log(file);
      // Add the file to the request.
      formData.append('photos[]', file, file.name);
    }
    console.log(formData); 
  };
  


}