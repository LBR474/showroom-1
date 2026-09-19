import { lazy, Suspense } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

const VLaBBottle1 = lazy(
  () => import("./model-pages/VLaB-bottle-1/VLaB-bottle-1"),
);

const YogaStudio = lazy(() => import("./model-pages/Yoga-studio-base"));

const BlackSheepShorts = lazy(() => import("./model-pages/black-sheep"));

const RVC = lazy(() => import("./model-pages/RVC-map-1"));

const Growplay4 = lazy(() => import("./model-pages/GrowPlay-4"));

const FStroke = lazy(() => import("./model-pages/FStroke"));

const Arova = lazy(() => import("./model-pages/Arova"));

const HK_1 = lazy(() => import("./model-pages/HK_1"));

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
      title: "Richmond Valley Council",
      image: `${import.meta.env.BASE_URL}images/RVC-menu-image-1.jpg`,
      link: "/model-4",
    },
    {
      title: "GrowPlay monkey bars",
      image: `${import.meta.env.BASE_URL}images/GP-menu-shot-1.jpg`,
      link: "/model-5",
    },
    {
      title: "4Stroke 3D logo",
      image: `${import.meta.env.BASE_URL}images/FStroke-1.jpg`,
      link: "/model-6",
    },
    {
      title: "Arova",
      image: `${
        import.meta.env.BASE_URL
      }images/Arova-menu-image-1.avif`,
      link: "/model-7",
    },

    {
      title: "Halcyon Knights",
      image: `${import.meta.env.BASE_URL}images/HK-menu-image-1.jpg`,
      link: "/model-8",
    },
    // {
    //   title: "BrickX",
    //   image: `${import.meta.env.BASE_URL}images/BrickX-menu-image-1.jpg`,
    //   link: "/model-9",
    // },

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
    <>
      <main className="showroom">
        <div className="titler">Projects</div>

        <section className="gallery">
          {models.map((model, index) => (
            <Link key={index} to={model.link} className="gallery-item">
              <img
                src={model.image}
                alt={model.title}
                loading={index >= 4 ? "lazy" : undefined}
                decoding={index >= 4 ? "async" : undefined}
              />
              <p>{model.title}</p>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/model-1" element={<VLaBBottle1 />} />
        <Route path="/model-2" element={<YogaStudio />} />
        <Route path="/model-3" element={<BlackSheepShorts />} />
        <Route path="/model-4" element={<RVC />} />
        <Route path="/model-5" element={<Growplay4 />} />
        <Route path="/model-6" element={<FStroke />} />
        <Route path="/model-7" element={<Arova />} />
        <Route path="/model-8" element={<HK_1 />} />
        {/* <Route path="/model-9" element={<BrickX />} /> */}
      </Routes>
    </Suspense>
  );
}
