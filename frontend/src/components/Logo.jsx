import { FileText } from "lucide-react";

const Logo = () => {
  return (
    <div>
      <div className="flex justify-center gap-2 md:justify-start">
        <a href="#" className="flex items-center gap-2 font-medium">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            {/* <GalleryVerticalEnd className="size-4" /> */}
            <FileText size={14} />
          </div>
          <span className="text-2xl font-bold">
            Docu<span className="text-orange-700 text">Lens.</span>
          </span>
        </a>
      </div>
    </div>
  );
};

export default Logo;
