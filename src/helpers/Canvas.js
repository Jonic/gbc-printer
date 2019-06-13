
export CanvasInit = () => {
  // Clear Screen
  TILE_PIXEL_WIDTH = 8;
  TILE_PIXEL_HEIGHT = 8;
  colors = new Array("#ffffff", "#aaaaaa", "#555555", "#000000");

  var canvas = document.getElementById("demo_canvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* Determine size of each pixel in canvas */
    square_width = canvas.width / (TILE_PIXEL_WIDTH * TILES_PER_LINE);
    square_height = square_width;
}
