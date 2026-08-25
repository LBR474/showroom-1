import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import VLaBBottle1 from "./model-pages/VLaB-bottle-1";
import BlackSheepShorts from "./model-pages/black-sheep";
import YogaStudio from "./model-pages/Yoga-studio-base";

import RVC from "./model-pages/RVC-map-1.tsx";



function HomePage() {
  const models = [
    {
      title: "Visma Lease-a-Bike bottle",
      image: `${import.meta.env.BASE_URL}images/VLAB-bottle-2.png`,
      link: "/model-1",
    },
    {
      title: "Yoga Studio",
      image: `${import.meta.env.BASE_URL}images/yoga-studio-menu-pic.jpg`,
      link: "/model-2",
    },
    {
      title: "Black Sheep Shorts",
      image: `${import.meta.env.BASE_URL}images/Black sheep shorts image 2.jpg`,
      link: "/model-3",
    },
    {
      title: "Richmond Valley Council map redraw",
      image: `${import.meta.env.BASE_URL}images/RVC-menu-image-1.jpg`,
      link: "/model-4",
    },

    // {
    //   title: "YogaStudio backup",
    //   image: "/images/stools_link_pic_1.png",
    //   link: "/model-3",
    // },
    // {
    //   title: "YogaStudio backup",
    //   image: "/images/stools_link_pic_1.png",
    //   link: "/model-3",
    // },
  ];

  return (
    <main className="showroom">
      <h1>Blender models show room</h1>

      <section className="gallery">
        {models.map((model, index) => (
          <Link key={index} to={model.link} className="gallery-item">
            <img src={model.image} alt={model.title} />
            <p>{model.title}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/model-1" element={<VLaBBottle1 />} />
      <Route path="/model-2" element={<YogaStudio />} />
      <Route path="/model-3" element={<BlackSheepShorts />} />
      <Route path="/model-4" element={<RVC />} />
    </Routes>
  );
}
