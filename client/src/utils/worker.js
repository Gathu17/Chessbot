const workercode = () => {
    let timerInterval;
    let time = 0;
    self.onmessage = function ({ data: { count } }) {
      if (turn === "off" || timerInterval) {
        clearInterval(timerInterval);
        time = 0;
      }
    //   if (turn === "on") {
    //     
    //   }
      timerInterval = setInterval(() => {
        count += 1;
        self.postMessage({ count });
        }, 1000);
    };
  };
  
  let code = workercode.toString();
  code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));
  
  const blob = new Blob([code], { type: "application/javascript" });
  const worker_script = URL.createObjectURL(blob);
  
  module.exports = worker_script;