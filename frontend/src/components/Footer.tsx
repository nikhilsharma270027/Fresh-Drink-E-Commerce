import { SocialIcon } from "react-social-icons";

const Footer = () => {
  return (
    <footer className="border-2 border-black ">
      <div className="flex justify-between broder-2">
        <div className="">
          <div className="pl-6 text-left py-1">Privacy Policy</div>
          <div className="pl-6 text-left py-1">Returns Policy</div>
          <div className="pl-6 text-left py-1">Shipping Policy</div>
          <div className="pl-6 text-left py-1">Terms of Use</div>
          <div className="pl-6 text-left py-1">Contact Us</div>
        </div>
        <div className="mr-8">
          <div className="text-2xl font-bold mt-2">About the Store</div>
          <div className="text-2xl font-bold mt-2">kombucha with a twist</div>
          <div className="flex justify-center items-center gap-8 mt-6 mb-10">
            {/* github */}
            <div className="border-2 border-black rounded-full">
              <div className="center">
                <SocialIcon url="https://twitter.com" />
              </div>
            </div>

            {/* Instagram */}
            <div className="border-2 border-black rounded-full">
              <div className="center">
                <SocialIcon url="https://instagram.com" />
              </div>
            </div>

            {/* Linkedin */}
            <div className="border-2 border-black rounded-full">
              <div className="center">
                <SocialIcon url="https://github.com" />
              </div>
            </div>
          </div>
        </div>

        {/* year 20024 */}
      </div>
        <div className="border-2 border-black">
            <div className="py-5 font-medium">
            ©2024 - Relativity Demo Store - Powered by Shopify
            </div>
        </div>
    </footer>
  );
};

export default Footer;
