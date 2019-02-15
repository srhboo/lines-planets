import * as THREE from 'three';

export const randomNumber = (center, halfRange) => center + (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * halfRange) + 1);

export const randomLineGenerator = center => {
  const randomColor = new THREE.Color( 0xffffff );
  randomColor.setHex( Math.random() * 0xffffff );
  const material = new THREE.LineBasicMaterial({ color: randomColor });
  const geometry = new THREE.Geometry();
  let firstPoint;
  const randomVertices = (Math.floor(Math.random() * 5)) + 2;

  for(let i=0; i<randomVertices; i++) {
    const point = [
      randomNumber(center, 20),
      randomNumber(center, 20),
      randomNumber(center, 20),
    ];
    if (i === 0) firstPoint = point;
    geometry.vertices.push(
      new THREE.Vector3(point[0], point[1], point[2])
    );
  }
  geometry.vertices.push(
      new THREE.Vector3(firstPoint[0], firstPoint[1], firstPoint[2])
  );
  return new THREE.Line(geometry, material);
};