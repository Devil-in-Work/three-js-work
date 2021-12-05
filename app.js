
let container;
let camera;
let renderer;
let scene;
let house;

function init(){
    container = document.querySelector(".scene")
    //create scene
    scene = new THREE.Scene();
    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near =0.1;
    const far = 500;

    camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
    camera.position.set(0,2.2,30);

    const ambient = new THREE.AmbientLight(0x404040,2);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff,2);
    light.position.set(10,10,10);
    scene.add(light)

    renderer = new THREE.WebGLRenderer({antialias:true ,alpha: true });
    renderer.setSize(container.clientWidth,container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    //load model
    let loader = new THREE.GLTFLoader;
    loader.load("./house/scene.gltf",function(gltf){
        scene.add(gltf.scene);
        house = gltf.scene.children[0];
        renderer.render(scene,camera);
        animate();
    })
}

let mouseX = 0
let mouseY = 0
let targetX = 0
let targetY = 0
const windowX = window.innerWidth / 2
const windowY = window.innerHeight / 2
function onDocumentMouseMove (event)  {
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}

function animate(){
    // requestAnimationFrame(animate);
    targetX = (mouseX * 0.003)
    targetY = (mouseY * 0.003)-1.8
    house.rotation.y += ((.5 * (targetX - house.rotation.y)) * .5)
    house.rotation.x += ((.8 * (targetY - house.rotation.x)) * .8)
    //-0.08

    //house.rotation.x +=0.005;
    renderer.render(scene,camera);

    window.requestAnimationFrame(animate);
}

function onWindowResize(){
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth,container.clientHeight);
}

window.addEventListener("resize",onWindowResize)
window.addEventListener("mousemove",onDocumentMouseMove)


init();