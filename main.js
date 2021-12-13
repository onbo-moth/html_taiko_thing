window.onload = function() {
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")

  const millis_in_sec = 1000
  const fps = 60

  const taiko_keys = "dfjk"
  
  const opacity_decrease_step = 5 / fps
  taiko_keys_opacity = [0, 0, 0, 0]
  
  class taiko_row {
    constructor(startx, starty, speed) {
      this.spawn = [startx, starty]
      this.speed = speed

      this.max_x = 600

      this.circles = []
    }
    add_circle(don_kan, big) {
      this.circles.push([this.spawn[0], this.spawn[1], don_kan, big])
    }
    update_circles() {
      for (var i=0; i<this.circles.length; i++) {
        this.circles[i][0] += this.speed
      }
    }
    render_circles() {
      for (var i=0; i<this.circles.length; i++) {
        ctx.beginPath()
        ctx.arc(this.circles[i][0], this.circles[i][1], 25*(1+this.circles[i][3]), 0, Math.PI*2)
        ctx.closePath()
        if(this.circles[i][2] == 0){
          ctx.fillStyle = "rgba(255, 127, 0, 255)"
        } else {
          ctx.fillStyle = "rgba(0, 127, 255, 255)"
        }
        ctx.fill()
      }
    }
  }

  document.addEventListener("keydown", function(e) {
    if (taiko_keys.indexOf(e.key) != -1) {
      taiko_keys_opacity[taiko_keys.indexOf(e.key)] = 1
      if(e.key == taiko_keys[1] || e.key == taiko_keys[2]) {
        if(taiko_keys_opacity[1] - taiko_keys_opacity[2] > -opacity_decrease_step*1.5 && taiko_keys_opacity[1] - taiko_keys_opacity[2] < opacity_decrease_step*1.5) { circles.add_circle(0, 1) }
        else { circles.add_circle(0, 0)}
      } 
      if(e.key == taiko_keys[0] || e.key == taiko_keys[3]) {
        if(taiko_keys_opacity[0] - taiko_keys_opacity[3] > -opacity_decrease_step*1.5 && taiko_keys_opacity[0] - taiko_keys_opacity[3] < opacity_decrease_step*1.5) { circles.add_circle(1, 1) }
        else { circles.add_circle(1, 0)}
      }
    }
  })

  setInterval(()=>{
    for (var i=0; i<taiko_keys_opacity.length; i++) {
      if (taiko_keys_opacity[i] - opacity_decrease_step < 0) {
        taiko_keys_opacity[i] = 0
      } else {
        taiko_keys_opacity[i] -= opacity_decrease_step
      }
    }    
  }, millis_in_sec/fps)

 

  circles = new taiko_row(100, 100, 900/fps)

  setInterval(()=>{
    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, 600, 200)

    // something
    ctx.fillStyle = "rgba(64, 64, 64, 255)"
    ctx.fillRect(0, 40, 1000, 120)

    // left kan
    ctx.beginPath()
    ctx.arc(100, 100, 50, Math.PI * 0.5, Math.PI * 1.5)
    ctx.closePath()
    ctx.fillStyle = `rgba(0, 127, 255, ${taiko_keys_opacity[0]})`
    ctx.fill()

    // right kan
    ctx.beginPath()
    ctx.arc(100, 100, 50, Math.PI * 1.5, Math.PI * 0.5)
    ctx.closePath()
    ctx.fillStyle = `rgba(0, 127, 255, ${taiko_keys_opacity[3]})`
    ctx.fill()

    // center fill
    ctx.beginPath()
    ctx.arc(100, 100, 40, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fillStyle = "#FFFFFF"
    ctx.fill()

    // outline
    ctx.beginPath()
    ctx.arc(100, 100, 50, Math.PI * 0, Math.PI * 2)
    ctx.closePath()
    ctx.fillStyle = `rgba(32, 32, 32, 0.5)`
    ctx.fill()
    ctx.lineWidth = 4
    ctx.strokeStyle = `rgba(64, 64, 64, 0.5)` 

    // left don
    ctx.beginPath()
    ctx.arc(100, 100, 40, Math.PI * 0.5, Math.PI * 1.5)
    ctx.closePath()
    ctx.fillStyle = `rgba(255, 127, 0, ${taiko_keys_opacity[1]})`
    ctx.fill()

    // right don
    ctx.beginPath()
    ctx.arc(100, 100, 40, Math.PI * 1.5, Math.PI * 0.5)
    ctx.closePath()
    ctx.fillStyle = `rgba(255, 127, 0, ${taiko_keys_opacity[2]})`
    ctx.fill()

    ctx.fillStyle = "#FFFFFF"

    circles.update_circles()
    circles.render_circles()

  }, millis_in_sec/fps)
}