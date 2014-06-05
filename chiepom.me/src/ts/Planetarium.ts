class Planetarium {
    private cover: HTMLDivElement;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private planet: Planet;
    private resizer: LazyResizer;

    private starDrawer: StarDrawer;
    private planetDrawer: PlanetDrawer;
    private asterismDrawer: AsterismDrawer;

    constructor() {
        this.canvas = document.createElement("canvas");
        this.cover = this.createCover();
        this.ctx = this.canvas.getContext("2d");

        this.fitCanvasToWindow();

        this.planet = new Planet(this.canvas.width, this.canvas.height);

        this.starDrawer = new StarDrawer(this.ctx);
        this.asterismDrawer = new AsterismDrawer(this.ctx);
        this.planetDrawer = new PlanetDrawer(this.ctx, this.starDrawer, this.asterismDrawer);

        this.planetDrawer.draw(this.planet);
        this.writeToBackground();

        this.resizer = new LazyResizer(() => {
            this.fitCanvasToWindow();
            this.planet.width = this.canvas.width;
            this.planet.height = this.canvas.height;
            this.planet.moveStars();
            this.planetDrawer.draw(this.planet);
            this.writeToBackground();
        });
    }

    private createCover() {
        var cover = document.createElement("div");
        cover.style.backgroundColor = new Color(0, 0, 1, 0.6).css;
        cover.style.zIndex = "-1";
        cover.style.position = "fixed";
        document.body.appendChild(cover);
        document.body.style.backgroundAttachment = "fixed";
        return cover;
    }

    private writeToBackground() {
        document.body.style.backgroundImage = "url({image})".format({
            image: this.canvas.toDataURL("image/png")
        });
    }

    private fitCanvasToWindow() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.cover.style.width = document.body.clientWidth + "px";
        this.cover.style.height = document.body.clientHeight + "px";
        this.cover.style.left = window.innerWidth / 2 - document.body.clientWidth / 2 + "px";
        this.cover.style.top = "0";
    }
}