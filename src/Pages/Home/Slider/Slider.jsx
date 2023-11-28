// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const Slider = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className=" bg-gradient-to-br from-orange-100">
            <div className="flex flex-wrap p-4 gap-4 h-screen items-center justify-between container ">
              <div className="flex-1 space-y-4">
                <h3 className="text-xl text-blue-600 tracking-widest uppercase">
                  Hello jenius
                </h3>
                <h2 className=" text-3xl md:text-7xl font-bold">
                  Welcome to <span className="text-orange-500">ContestHub</span>
                </h2>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Eius, labore sed numquam aliquid molestias ea harum
                  accusantium sit, rerum possimus qui. Esse dolore, temporibus
                  architecto commodi nesciunt expedita at voluptatum.
                </p>
                <Link to={"/contests"}>
                  <button className="btn mt-6 bg-orange-500 text-white hover:text-orange-500 hover:bg-black text-lg">
                    Show All Contest
                  </button>
                </Link>
              </div>
              <div>
                <img
                  className=""
                  src="https://i.ibb.co/hMx4zZS/programmer.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" bg-gradient-to-br from-orange-100">
            <div className="flex flex-wrap p-4 gap-4 h-screen items-center justify-between container ">
              <div className="flex-1 space-y-4">
                <h3 className="text-xl text-blue-600 tracking-widest uppercase">
                  Hello jenius
                </h3>
                <h2 className=" text-3xl md:text-7xl font-bold">
                  Welcome to <span className="text-orange-500">ContestHub</span>
                </h2>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Eius, labore sed numquam aliquid molestias ea harum
                  accusantium sit, rerum possimus qui. Esse dolore, temporibus
                  architecto commodi nesciunt expedita at voluptatum.
                </p>
                <Link to={"/contests"}>
                  <button className="btn mt-6 bg-orange-500 text-white hover:text-orange-500 hover:bg-black text-lg">
                    Show All Contest
                  </button>
                </Link>
              </div>
              <div>
                <img
                  className=""
                  src="https://i.ibb.co/hMx4zZS/programmer.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" bg-gradient-to-br from-orange-100">
            <div className="flex flex-wrap p-4 gap-4 h-screen items-center justify-between container ">
              <div className="flex-1 space-y-4">
                <h3 className="text-xl text-blue-600 tracking-widest uppercase">
                  Hello jenius
                </h3>
                <h2 className=" text-3xl md:text-7xl font-bold">
                  Welcome to <span className="text-orange-500">ContestHub</span>
                </h2>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Eius, labore sed numquam aliquid molestias ea harum
                  accusantium sit, rerum possimus qui. Esse dolore, temporibus
                  architecto commodi nesciunt expedita at voluptatum.
                </p>
                <Link to={"/contests"}>
                  <button className="btn mt-6 bg-orange-500 text-white hover:text-orange-500 hover:bg-black text-lg">
                    Show All Contest
                  </button>
                </Link>
              </div>
              <div>
                <img
                  className=""
                  src="https://i.ibb.co/hMx4zZS/programmer.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
