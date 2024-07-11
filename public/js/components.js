document.addEventListener("DOMContentLoaded", function() {
    var checkboxes = document.getElementsByClassName("checkbox");

    Array.from(checkboxes).forEach(function(checkbox) {
        checkbox.addEventListener("click", function() {
            this.classList.toggle("clicked");
        });
    });



    var status_btns = document.getElementsByClassName("status");

    Array.from(status_btns).forEach(function(status_btns) {
        status_btns.addEventListener("click", function() {
            var currentState = this.classList[1];
            var img = this.querySelector('img');
            var text = this.querySelector('span');

            if (currentState == "resolved") {
                this.classList.remove('resolved');
                this.classList.add('ongoing');
                img.src="../public/images/ongoing-circle.png"
                text.textContent = "Ongoing";
            } else {
                this.classList.remove('ongoing');
                this.classList.add('resolved');
                img.src="../public/images/resolved-circle.png"
                text.textContent = "Resolved";
            }
        });
    });

    var sort_btns = document.getElementsByClassName("sort");

    Array.from(sort_btns).forEach(function(sort_btns) {
        sort_btns.addEventListener("click", function() {
            var currentState = this.classList[1];
            var img = this.querySelector('img');

            if (currentState == "descending") {
                this.classList.remove('descending');
                this.classList.add('ascending');
                img.src="../public/images/sort-ascending.png"
            } else {
                this.classList.remove('ascending');
                this.classList.add('descending');
                img.src="../public/images/sort-descending.png"
            }
        });
    });
});