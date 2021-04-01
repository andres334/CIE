import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { NoimagePipe,NonamePipe } from "./pipes"; // <---

@NgModule({
  declarations:[NoimagePipe,NonamePipe], // <---
  imports:[CommonModule],
  exports:[NoimagePipe,NonamePipe] // <---
})

export class MainPipe{}
