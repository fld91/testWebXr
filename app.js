import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';
import { Stats } from './stats.module.js';
import { ARButton } from './ARButton.js';

class App{
	constructor(){
        console.info("qwertyuio")
		const container = document.createElement( 'div' );
		document.body.appendChild( container );
        
        this.clock = new THREE.Clock();
        
		this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 20 );
		
		this.scene = new THREE.Scene();
       
		this.scene.add( new THREE.HemisphereLight( 0x606060, 0x404040 ) );

        const light = new THREE.DirectionalLight( 0xffffff );
        light.position.set( 1, 1, 1 ).normalize();
		this.scene.add( light );

      

				// const texture = new THREE.VideoTexture( video );

				// const geometry = new THREE.PlaneGeometry( 16, 9 );
				// geometry.scale( 0.5, 0.5, 0.5 );
				// const material = new THREE.MeshBasicMaterial( { map: texture } );
                // const mesh = new THREE.Mesh( geometry, material );
                // mesh.lookAt( this.camera.position );
				// this.scene.add( mesh );

				

                // if ( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ) {

				// 	const constraints = { video: { width: 1280, height: 720, facingMode: 'user' } };

				// 	navigator.mediaDevices.getUserMedia( constraints ).then( function ( stream ) {

				// 		// apply the stream to the video element used in the texture

				// 		video.srcObject = stream;
				// 		video.play();

				// 	} ).catch( function ( error ) {

				// 		console.error( 'Unable to access the camera/webcam.', error );

				// 	} );

				// } else {

				// 	console.error( 'MediaDevices interface not available.' );

				// }
			
		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true } );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        
		container.appendChild( this.renderer.domElement );
        
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.controls.target.set(0, 3.5, 0);
        this.controls.update();
        
        this.stats = new Stats();
        
        this.initScene();
        this.setupVR();
        
        window.addEventListener('resize', this.resize.bind(this) );
	}	
    
    initScene(){
        this.geometry = new THREE.BoxBufferGeometry( 0.06, 0.06, 0.06 ); 
        this.meshes = [];
    }
    
    setupVR(){
        this.renderer.xr.enabled = true; 
        
        const self = this;
        let controller;
        
        function onSelect() {
            const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random() } );
            const mesh = new THREE.Mesh( self.geometry, material );
            mesh.position.set( 0, 0, -0.09 ).applyMatrix4( controller.matrixWorld );
            mesh.quaternion.setFromRotationMatrix( controller.matrixWorld );
            self.scene.add( mesh );
            self.meshes.push( mesh );

        }
       const texture = new THREE.VideoTexture( video );

				const geometry = new THREE.PlaneGeometry( 5, 3 );
				geometry.scale( 0.3, 0.3, 0.3 );
				const material = new THREE.MeshBasicMaterial( { map: texture } );
                const mesh = new THREE.Mesh( geometry, material );
                mesh.lookAt( this.camera.position );
				this.scene.add( mesh );

				

                if ( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ) {

					const constraints = { video: { width: 900, height: 450, facingMode: 'user' } };
					// const constraints = { video: { width: 1280, height: 720, facingMode: 'user' } };

					navigator.mediaDevices.getUserMedia( constraints ).then( function ( stream ) {

						// apply the stream to the video element used in the texture

						video.srcObject = stream;
						video.play();

					} ).catch( function ( error ) {

						console.error( 'Unable to access the camera/webcam.', error );

					} );

				} else {

					console.error( 'MediaDevices interface not available.' );

				}

        const btn = new ARButton( this.renderer );
        
        controller = this.renderer.xr.getController( 0 );
        controller.addEventListener( 'select', onSelect );
        this.scene.add( controller );
        
        this.renderer.setAnimationLoop( this.render.bind(this) );
    }
    
    resize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );  
    }
    
	render( ) {   
        this.stats.update();
        // this.meshes.forEach( (mesh) => { mesh.rotateY( 0.01 ); });
        this.renderer.render( this.scene, this.camera );
    }
}

export { App };