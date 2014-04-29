class Chiepomme {

    two: Two;
    rect: Two.Shape;

    start(root: HTMLElement) {
        var params = {
            type: Two.Types.canvas,
            fullscreen: true,
        };

        this.two = new Two(params);
        this.two.appendTo(root);

        var circle = this.two.makeCircle(10, 10, 10);
        this.rect = this.two.makeRectangle(30, 30, 30, 30);
        circle.fill = "#FF8000";
        circle.stroke = "orangered";
        circle.linewidth = 5;

        this.rect.fill = "#00CCFF";
        this.rect.opacity = 0.75;
        this.rect.noStroke();

        this.rect.translation.set(20, 50);
        this.rect.rotation = Math.PI;

        this.two.bind(Two.Events.update, (frame) => {
            console.log(frame);
            this.rect.scale *= 1.001;
        });

        /*
        window.onresize = (ev) => {
            this.two.width = window.innerWidth;
            this.two.height = window.innerHeight;
        };
        */

        this.two.play();
    }

    update() {
        /*
        this.rect.translation.x += 1;
        this.two.update();
        window.setTimeout(this.update, 1);
*/
    }
}

window.onload = () => {
    var chiepomme = new Chiepomme();
    var el = document.getElementById("root");
    var canvas = document.getElementsByTagName("canvas");
    chiepomme.start(el);
}
