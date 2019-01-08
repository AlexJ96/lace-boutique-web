import { Directive, Input, ElementRef } from '@angular/core';
import { BlockerService } from '../services/blocker.service';

@Directive({
  selector: '[blocker]',
})

export class BlockerDirective {

  constructor(private blocker: BlockerService, private el: ElementRef) {

  }

  blocked: Boolean = false;

  @Input('blocker') blockName: String;
  originalInnerHtml: String;

  ngOnInit() {
    var me = this;
    me.originalInnerHtml = me.el.nativeElement.innerHTML;
    me.blocker.blocksUpdated.subscribe((data: Array<String>) => {
      me.processBlock(data);
    });

    // Go to the API to get the latest list of blocks now loaded
    me.processBlock(me.blocker.getBlocks());

  }

  processBlock(data) : any {
    var me = this;
    var thisElementBlocked = false;
    data.forEach(blocked => {
      if (blocked == me.blockName) {
        thisElementBlocked = true;
      }
    });

    var element = this.el.nativeElement;

    if (thisElementBlocked) {
      if (!me.blocked) {
        me.blocked = true;
        switch (me.el.nativeElement.tagName.toLowerCase()) {
          case "input":
          case "textarea":
            this.el.nativeElement.setAttribute("disabled", "");
            break;
          case "button":
            this.el.nativeElement.setAttribute("disabled", "");
            this.el.nativeElement.innerHTML = '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i>';
            break;
          case "table":

            // Get the table footer, if it doesn't exist create it.
            var footer = element.tFoot;
            if (footer == null) {
              footer = element.createTFoot();
            }
            // Add a loading row to the table footer
            var row = footer.insertRow(0);
            row.id = "loadingRow";
            var cell = row.insertCell(0);
            
            cell.colSpan = 999;
            cell.style.textAlign = "center";
            cell.innerHTML = '<span style="text-align:center; margin-top: 20px; margin-bottom: 20px; color: #231f20"><i class="fa fa-spinner fa-spin fa-3x fa-fw"></i></span>';
            // Hide the load more row if exists
            var row = footer.querySelector("#loadMore");
            if (row != null) {
              row.style.display = "none";
            }
            break;
          case "div":
            var overlay = document.createElement("div");
            element.appendChild(overlay);
            element.style.position = "relative";
            overlay.id = "loadingOverlay";
            overlay.style.position = "absolute";
            overlay.style.width = "100%";
            overlay.style.height = "100%";
            overlay.style.top = "0";
            overlay.style.left = "0";
            overlay.style.background = "rgba(255,255,255,1)";
            overlay.style.zIndex = "999";
            overlay.style.textAlign = "center";
            overlay.style.minHeight = "200px";
            overlay.innerHTML = '<div style="text-align:center; margin-top: 50px; margin-bottom: 50px; color: #231f20"><i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><br /><br />Loading ' + this.blockName + '</span>';
            break;
        }
      }
    } else {
      if (me.blocked) {
        me.blocked = false;
        switch (me.el.nativeElement.tagName.toLowerCase()) {
          case "input":
          case "textarea":
            this.el.nativeElement.removeAttribute("disabled");
            break;
          case "button":
            this.el.nativeElement.removeAttribute("disabled");
            this.el.nativeElement.innerHTML = me.originalInnerHtml;
            break;
          case "table":
            var footer = element.tFoot;
            if (footer != null) {
              var loadingRow = footer.querySelector("#loadingRow");
              if (loadingRow != null) {
                footer.deleteRow(loadingRow);
              }
            }
            // Show the load more row if exists
            var row = footer.querySelector("#loadMore");
            if (row != null) {
              row.style.display = "table-row";
            }
            break;
          case "div":
            var loadingOverlay = element.querySelector("#loadingOverlay");
            if (loadingOverlay != null) {
              element.removeChild(loadingOverlay);
            }
            break;
        }
      }
    }
  }
}
