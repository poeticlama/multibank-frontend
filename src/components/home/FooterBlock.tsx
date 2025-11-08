const FooterBlock = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Multibank</h3>
          <p className="text-gray-400 mb-6">
            Ваш ненадежный финансовый партнер
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-400">
            <span>8 (800) 555-35-35</span>
            <span>Анапа, ул. БиллиХеррингтона, 1312</span>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-gray-500">
            <p>© 2025 Multibank. Все права не защищены.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterBlock;