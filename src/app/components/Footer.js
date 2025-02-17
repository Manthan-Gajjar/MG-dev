
//   export default function Footer() {
  //   return (
    //     <footer className="bg-gray-800 text-white button-85 m-5">
    //       <div className="container mx-auto px-6 py-4 flex flex-col items-center text-center">
    //         <p className="text-lg sm:text-xl font-bold">&copy; 2023 MG Dev. All rights reserved.</p>
    //         <div className="flex space-x-4 mt-4">
    //           <a href="#" className="text-gray-400 hover:text-white text-lg">
    //             <i className="fab fa-facebook"></i>
    //           </a>
    //           <a href="#" className="text-gray-400 hover:text-white text-lg">
    //             <i className="fab fa-twitter"></i>
    //           </a>
    //           <a href="#" className="text-gray-400 hover:text-white text-lg">
    //             <i className="fab fa-instagram"></i>
    //           </a>
    //         </div>
    //       </div>
    //     </footer>
    //   )
    // }
    
    // import css from "./button.css"

import css from "./button.css";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white m-5 py-6 button-85">
      <div className="container mx-auto px-6 flex flex-col items-center justify-center text-center">
        <p className="text-lg sm:text-xl font-bold">&copy; 2023 MG Dev. All rights reserved.</p>
        <div className="flex space-x-6 mt-4">
          <a href="#" className="text-gray-400 hover:text-white text-2xl">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white text-2xl">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white text-2xl">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}