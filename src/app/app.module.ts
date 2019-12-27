import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app-component/app.component';
import { ToDoComponent } from './components/todo-component/to-do.component';
import { TodoRepositoryService } from './Services/todo-repository.service';
@NgModule({
  declarations: [
    AppComponent,
    ToDoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [TodoRepositoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
