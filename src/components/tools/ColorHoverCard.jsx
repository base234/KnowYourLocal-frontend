import { Fragment } from "react";

const ColorHoverCard = () => {
  const colors = [
    "#e11d48",
    "#f472b6",
    "#fb923c",
    "#facc15",
    "#84cc16",
    "#10b981",
    "#0ea5e9",
    "#3b82f6",
    "#8b5cf6",
    "#a78bfa",
  ];
  return (
    <Fragment>
      <div
        className="flex"
        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      >
        {colors.map((color) => (
          <button
            key={color}
            className="item-color relative w-8 h-10 shrink-0 border-0 outline-none transition-transform duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.1)] cursor-pointer"
            aria-color={color}
            style={{ "--color": color }}
          ></button>
        ))}
      </div>

      {/* Embedded CSS for pseudo-elements and advanced selectors */}
      <style>{`
        .item-color::after {
          content: "";
          position: absolute;
          inset: 0;
          width: 40px;
          height: 40px;
          background-color: var(--color);
          border-radius: 6px;
          transform: scale(1.2);
          pointer-events: none;
          transition: 500ms cubic-bezier(0.175, 0.885, 0.32, 1.1);
        }

        .item-color::before {
          content: attr(aria-color);
          position: absolute;
          left: 65%;
          bottom: 52px;
          font-size: 8px;
          line-height: 12px;
          transform: translateX(-50%);
          padding: 2px 0.25rem;
          background-color: #ffffff;
          border-radius: 6px;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: 500ms cubic-bezier(0.175, 0.885, 0.32, 1.1);
        }

        .item-color:hover {
          transform: scale(1.5);
          z-index: 99999;
        }

        .item-color:hover::before {
          opacity: 1;
          visibility: visible;
        }

        .item-color:active::after {
          transform: scale(1.1);
        }

        .item-color:focus::before {
          content: "✅Copy";
        }

        .item-color:hover + .item-color {
          transform: scale(1.3);
          z-index: 9999;
        }

        .item-color:hover + .item-color + .item-color {
          transform: scale(1.15);
          z-index: 999;
        }

        .item-color:has(+ .item-color:hover) {
          transform: scale(1.3);
          z-index: 9999;
        }

        .item-color:has(+ .item-color + .item-color:hover) {
          transform: scale(1.15);
          z-index: 999;
        }
      `}</style>
    </Fragment>
  );
};

export default ColorHoverCard;
