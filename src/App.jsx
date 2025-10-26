import { useState, useCallback, useEffect } from 'react'
import Particles from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { initParticlesEngine } from '@tsparticles/react'

import bgimg from './assets/4002676.jpg'
import dp from './assets/dp.jpg'
import { FaInstagram, FaYoutube, FaTwitter, FaTelegram, FaWhatsapp, FaGithub, FaGlobe } from 'react-icons/fa'

function App() {
  const [init, setInit] = useState(false)
  const [socialLinks, setSocialLinks] = useState([
    {
      id: 1,
      name: "Instagram",
      icon: <FaInstagram />,
      appUrl: "instagram://user?username=buntynamberdar",
      webUrl: "https://www.instagram.com/buntynamberdar",
      color: "from-pink-500 to-yellow-500",
      style: { background: "linear-gradient(to right, #ec4899, #eab308)" }
    },
    {
      id: 2,
      name: "YouTube",
      icon: <FaYoutube />,
      appUrl: "vnd.youtube://www.youtube.com/@buntynamberdar",
      webUrl: "https://www.youtube.com/@buntynamberdar",
      color: "from-red-500 to-rose-500",
      style: { background: "linear-gradient(to right, #ef4444, #f43f5e)" }
    },
    {
      id: 3,
      name: "Twitter (X)",
      icon: <FaTwitter />,
      appUrl: "twitter://user?screen_name=buntynamberdar",
      webUrl: "https://twitter.com/buntynamberdar",
      color: "from-blue-400 to-blue-600",
      style: { background: "linear-gradient(to right, #60a5fa, #2563eb)" }
    },
    {
      id: 4,
      name: "Telegram",
      icon: <FaTelegram />,
      appUrl: "tg://resolve?domain=buntynamberdar",
      webUrl: "https://t.me/buntynamberdar",
      color: "from-sky-500 to-cyan-600",
      style: { background: "linear-gradient(to right, #0ea5e9, #0891b2)" }
    },
    {
      id: 5,
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      appUrl: "whatsapp://send?phone=91&text=Hello%20Bunty!",
      webUrl: "https://wa.me/91?text=Hello%20Bunty!",
      color: "from-green-500 to-emerald-600",
      style: { background: "linear-gradient(to right, #22c55e, #059669)" }
    },
    {
      id: 6,
      name: "GitHub",
      icon: <FaGithub />,
      appUrl: "https://github.com/sushilnamberdar",
      webUrl: "https://github.com/sushilnamberdar",
      color: "from-gray-700 to-gray-900",
      style: { background: "linear-gradient(to right, #374151, #111827)" }
    },
    {
      id: 7,
      name: "Portfolio",
      icon: <FaGlobe />,
      appUrl: "https://buntynamberdar.vercel.app/",
      webUrl: "https://buntynamberdar.vercel.app/",
      color: "from-indigo-500 to-purple-600",
      style: { background: "linear-gradient(to right, #6366f1, #9333ea)" }
    }
  ])


  useEffect(() => {
    console.log("Initializing particles engine...")
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
      console.log("Particles engine loaded successfully")
    }).then(() => {
      console.log("Particles engine initialized, setting init to true")
      setInit(true)
    }).catch((error) => {
      console.error("Error initializing particles:", error)
    })
  }, [])

  const particlesLoaded = useCallback(async (container) => {
    console.log("Particles loaded:", container)
  }, [])

  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }

  const openSmartLink = (appUrl, webUrl) => {
    if (!isMobile()) {
      window.open(webUrl, "_blank", "noopener,noreferrer");
      return;
    }

    let timeoutId = null;
    let iframe = null;
    let handled = false;

    const cleanup = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("blur", onBlur);
      try {
        if (iframe && iframe.parentNode) iframe.parentNode.removeChild(iframe);
      } catch (e) {}
      iframe = null;
    };

    const fallbackToWeb = () => {
      if (handled) return;
      handled = true;
      cleanup();
      window.location.href = webUrl;
    };

    const onVisibilityChange = () => {
      // If page becomes hidden, assume OS switched to the native app — cancel fallback
      if (document.visibilityState === "hidden") {
        handled = true;
        cleanup();
      }
    };

    const onPageHide = () => {
      handled = true;
      cleanup();
    };

    const onBlur = () => {
      // some browsers trigger blur when switching to app
      handled = true;
      cleanup();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("blur", onBlur);

    // Try to open the native app via iframe
    iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = appUrl;
    document.body.appendChild(iframe);

    // Fallback to web if nothing happened within timeout
    timeoutId = setTimeout(() => {
      fallbackToWeb();
    }, 1500);
  };


  return (
    <div className="relative  min-h-screen flex flex-col items-center justify-center text-white overflow-hidden" style={{ backgroundImage: `url(${bgimg})`,backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Particles Background - Full Screen */}
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={{
            fullScreen: {
              enable: true
            },
            background: {
              color: {
                value: "transparent"
              }
            },
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "grab"
                },
                onClick: {
                  enable: true,
                  mode: "push"
                },
                resize: true
              },
              modes: {
                grab: {
                  distance: 200,
                  links: {
                    opacity: 0.4
                  }
                },
                push: {
                  quantity: 4
                }
              }
            },
            particles: {
              number: {
                value: 200,
                density: {
                  enable: true,
                  area: 600
                }
              },
              color: {
                value: "#ffffff"
              },
              shape: {
                type: "circle"
              },
              opacity: {
                value: 0.8
              },
              size: {
                value: {
                  min: 2,
                  max: 6
                }
              },
              links: {
                enable: true,
                distance: 150,
                color: "#1df528",
                opacity: 0.4,
                width: 1
              },
              move: {
                enable: true,
                speed: 2,
                random: true,
                outModes: {
                  default: "out"
                }
              }
            },
            detectRetina: true,
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1
          }}
        />
      )}

      <div className="relative z-20 flex flex-col items-center p-6">
        <div className="text-center  mb-8">
          <img src={dp} alt="Bunty Namberdar" className="w-14 h-14 userimg rounded-full border-4 border-white shadow-xl mx-auto" />
          <h1 className="text-3xl font-bold mt-4 text-white">Bunty Namberdar</h1>
          <p className="text-white mt-2">@buntynamberdar</p>
          <p className="mt-2 text-sm text-white">Digital Creator | Tech Enthusiast | Dream Builder 🚀</p>
        </div>

        <div className="w-full  max-w-sm space-y-4">
          {socialLinks.map((link, i) => (
            <button
              key={i}
              onClick={() => openSmartLink(link.appUrl, link.webUrl)}
              className={`relative flex items-center justify-center space text-center py-4 px-6 rounded-3xl font-bold text-lg bg-gradient-to-r ${link.color} hover:scale-110 hover:shadow-2xl transition-all duration-300 shadow-xl w-full text-white min-h-[60px]`}
              style={link.style || {}}
            >
            
                {link.icon} {link.name}
            </button>
          ))}
        </div>

        <p className="mt-10 text-xs text-white">Made with ❤️ by <span className="text-white">Bunty Namberdar</span></p>
      </div>
    </div>
  )
}

export default App
