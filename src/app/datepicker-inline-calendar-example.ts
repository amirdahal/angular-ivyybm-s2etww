import {Component, Renderer2} from '@angular/core';

/** @title Datepicker inline calendar example */
@Component({
  selector: 'datepicker-inline-calendar-example',
  templateUrl: 'datepicker-inline-calendar-example.html',
  styleUrls: ['datepicker-inline-calendar-example.css'],
})
export class DatepickerInlineCalendarExample {
  selected: Date | null;
  dates = [
    { date: "2022-11-01", text: "Hello" },
    { date: "2020-09-20", text: "Special Day 2" }
  ];
  Today  = [{ date: this.dateToString(new Date()), text: "Today" }]
  constructor(private renderer: Renderer2){}

  displayMonth() {
    setTimeout(()=>{
    let elements = document.querySelectorAll(".endDate");
    console.log("*",elements.length)
    let x = document.querySelectorAll(".mat-calendar-body-cell");
    x.forEach(y => {
      const dateSearch = this.dateToString(
        new Date(y.getAttribute("aria-label")|| this.Today[0].date)
      );
      const data = this.dates.find(f => f.date == dateSearch);
      const data_today = this.Today.find(f => f.date == dateSearch);
      if (data) y.setAttribute("aria-label", data.text);
      if (data_today) y.setAttribute("aria-label", data_today.text);
    });

    })
  }
  streamOpened(event:any) {
    setTimeout(() => {
      let buttons = document.querySelectorAll("mat-calendar .mat-icon-button");

      buttons.forEach(btn =>
        this.renderer.listen(btn, "click", () => {
          setTimeout(() => {
            //debugger
            this.displayMonth();
          });
        })
      );
      this.displayMonth();
    });
  }

  dateClass = (d: Date) => {
    if (d.getDate()==1)
      this.displayMonth()
    const dateSearch = this.dateToString(d);
    if (this.Today.find(f => f.date == dateSearch)) {
      return this.Today.find(f => f.date == dateSearch)
      ? "todays_class"
      : "normal";
    } else {
      return this.dates.find(f => f.date == dateSearch)
      ? "example-custom-date-class"
      : "normal";
    }

  };

  dateToString(date: any) {
    return (
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2)
    );
  }
}


/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */