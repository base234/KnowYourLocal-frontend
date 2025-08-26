import React from "react";

const PushingPixelLoader = () => {
  return (
    <div className="flex justify-center items-center">
      <style>{css}</style>
      <div className="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

const css = `
.loading span {
  display: inline-block;
  vertical-align: middle;
  width: .6em;
  height: .6em;
  margin: .5em;
  background: #007DB6;
  border-radius: .6em;
  animation: loading 1s infinite alternate;
}
.loading span:nth-of-type(2) {
  background: #008FB2;
  animation-delay: 0.2s;
}
.loading span:nth-of-type(3) {
  background: #009B9E;
  animation-delay: 0.4s;
}
.loading span:nth-of-type(4) {
  background: #00A77D;
  animation-delay: 0.6s;
}
.loading span:nth-of-type(5) {
  background: #00B247;
  animation-delay: 0.8s;
}
.loading span:nth-of-type(6) {
  background: #5AB027;
  animation-delay: 1.0s;
}
.loading span:nth-of-type(7) {
  background: #A0B61E;
  animation-delay: 1.2s;
}
@keyframes loading {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
`;

export default PushingPixelLoader;
