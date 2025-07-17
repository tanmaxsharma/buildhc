export default function FooterSection() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">HireCreative</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              The fastest way to hire world-class creative professionals.
              Connect with vetted talent and get your projects done right.
            </p>
            <div className="flex space-x-4 mt-4">
              <span className="text-gray-400 hover:text-white cursor-pointer">
                📘
              </span>
              <span className="text-gray-400 hover:text-white cursor-pointer">
                🐦
              </span>
              <span className="text-gray-400 hover:text-white cursor-pointer">
                📷
              </span>
              <span className="text-gray-400 hover:text-white cursor-pointer">
                💼
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Clients</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">Browse Talent</li>
              <li className="hover:text-white cursor-pointer">How It Works</li>
              <li className="hover:text-white cursor-pointer">
                Success Stories
              </li>
              <li className="hover:text-white cursor-pointer">Pricing</li>
              <li className="hover:text-white cursor-pointer">Enterprise</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Creatives</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">
                Join as Professional
              </li>
              <li className="hover:text-white cursor-pointer">Find Work</li>
              <li className="hover:text-white cursor-pointer">Resources</li>
              <li className="hover:text-white cursor-pointer">Community</li>
              <li className="hover:text-white cursor-pointer">Support</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center">
                <span className="mr-2">📧</span>
                hello@hirecreative.com
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                +1 (555) 123-4567
              </li>
              <li className="flex items-center">
                <span className="mr-2">📍</span>
                San Francisco, CA
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 HireCreative. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}