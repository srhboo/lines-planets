import React, { Component } from "react";
import * as THREE from "three";

import { randomLineGenerator } from "./utils/make-shapes";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const lineOne = randomLineGenerator(60);
    const lineTwo = randomLineGenerator(-10);
    const lineThree = randomLineGenerator(50);
    const lineFour = randomLineGenerator(-80);
    const sphereGeometry = new THREE.SphereGeometry(20, 32, 32);
    var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x336699 });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    scene.add(sphere);
    scene.add(lineOne);
    scene.add(lineTwo);
    scene.add(lineThree);
    scene.add(lineFour);

    camera.position.z = 200;
    light.position.set(100, 10, 10);
    scene.add(light);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.sphere = sphere;
    this.lineOne = lineOne;
    this.lineTwo = lineTwo;
    this.lineThree = lineThree;
    this.lineFour = lineFour;

    this.mount.appendChild(this.renderer.domElement);
    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }

  animate() {
    this.lineOne.rotation.x += 0.01;
    this.lineOne.rotation.y += 0.01;
    this.lineTwo.rotation.x += 0.01;
    this.lineTwo.rotation.y += 0.01;
    this.lineThree.rotation.z += 0.01;
    this.lineFour.rotation.z += 0.01;
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div
        className="App"
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default App;
