const products = [
  {
    _id: '1',
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: 'Electronics',
    price: "12,990",
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
    brandlogo:'/images/shopping-cart-icon.png'
  },
  {
    _id: '2',
    name: 'iPhone 11 Pro 256GB Memory',
    image: '/images/phone.jpg',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Apple',
    category: 'Electronics',
    price: "1,31,999",
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
    brandlogo:'/images/shopping-cart-icon.png'
  },
  {
    _id: '3',
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: 'Electronics',
    price: "90,499",
    countInStock: 5,
    rating: 3,
    numReviews: 12,
    brandlogo:'/images/shopping-cart-icon.png'
  },
  {
    _id: '4',
    name: 'Sony Playstation 4 Pro ',
    image: '/images/playstation.jpg',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: 'Electronics',
    price: "41,999",
    countInStock: 11,
    rating: 5,
    numReviews: 12,
    brandlogo:'/images/shopping-cart-icon.png'
  },
  {
    _id: '5',
    name: 'Logitech G-Series Gaming Mouse',
    image: '/images/mouse.jpg',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: 'Electronics',
    price: "1,599",
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
    brandlogo:'/images/shopping-cart-icon.png'
  },
  {
    _id: '6',
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: 'Electronics',
    price: "2,499",
    countInStock: 0,
    rating: 4,
    numReviews: 12,
    brandlogo:'/images/shopping-cart-icon.png'
  },
  {
    _id: '7',
    name: 'HP Pavilion Gaming Ryzen 5 ',
    image: '/images/hp-gaminglaptop.jpeg',
    description:
      '8 GB/1 TB HDD/Windows 10 Home/4 GB Graphics/NVIDIA GeForce GTX 1650 and 15-ec0101AX Gaming Laptop  (15.6 inch, Black, 2.04 kg)',
    brand: 'HP',
    category: 'Electronics',
    price: "50,990",
    countInStock: 10,
    rating: 4.2,
    numReviews: 6,
    brandlogo:'/images/shopping-cart-icon.png'
  },
  {
    _id: '8',
    name: 'Coolnut 60000 mAh Power Bank',
    image: '/images/coolnut.jpeg',
    description:
      "Easily and conveniently charge laptop with a distinct power output With huge and powerful 60000 mAh capacity, comfortably provide multiple charging cycles to your power hungry devices. Whether you're a businessman with one or two laptops open, a technical individual with multiple tabs,or a teenager glued to your smartphone, mostly we go out of power, when we need it the most. Thankfully, this Coolnut ultra high capacity 60000mAh laptop power bank assures to keep your devices powered during all those crucial moments",
    brand: 'Coolnut',
    category: 'Electronics',
    price: "18,999",
    countInStock: 5,
    rating: 4.4,
    numReviews: 5,
    brandlogo:'/images/shopping-cart-icon.png'
  },
  {
    _id: '9',
    name: 'APPLE Watch Series 3',
    image: '/images/applewatch.jpeg',
    description:
      "The Apple Watch Series 3 is a sleek accessory that's a must-have if you're all about staying fit. The watch features an enhanced Heart Rate app, and a built-in altimeter. Also carry and listen to your favourite songs on your wrist. Equipped with Siri, this smartwatch makes being active and staying connected enjoyable.",
    brand: 'Apple',
    category: 'Electronics',
    price: "22,566",
    countInStock: 7,
    rating: 4.7,
    numReviews: 10,
    brandlogo:'/images/shopping-cart-icon.png'
  },
  {
    _id: '10',
    name: 'veer Falcon VR Headset ',
    image: '/images/VRheadset.jpeg',
    description:
      "VeeR Falcon VR Headset with Controller, Universal Virtual Reality Goggles to Comfortable Watch 360 Movies for Android, Samsung Galaxy S9 & Note 9, Huawei and iPhone XR & Xs Max",
    brand: 'Veer',
    category: 'Electronics',
    price: "10,599",
    countInStock: 2,
    rating: 4.2,
    numReviews: 1,
    brandlogo:'/images/shopping-cart-icon.png'
  },
  {
    _id: '11',
    name: 'G-Tech 2 TB External Drive',
    image: '/images/G-techHarddisk.jpeg',
    description:
      "It is a  External Hard Drive and its a model of 2TB G-DRIVE Mobile Pro SSD Portable Professional Grade External Storage - Thunderbolt 3 - 0G10312-1 and System Requirements Windows, Mac and it is Portable and can have Cloud Backup",
    brand: 'G-Tech',
    category: 'Electronics',
    price: "36,499",
    countInStock: 4,
    rating: 4.6,
    numReviews: 4,
    brandlogo:'/images/shopping-cart-icon.png'
  },
  {
    _id: '12',
    name: 'APPLE ipad Mini (2019) 64 GB ',
    image: '/images/appleipad.jpeg',
    description:
      "Let your biggest and most creative ideas come to life with the iPad Mini whose portable design along with a retina display will help you unleash your creative best at any point in time. It also comes with the A12 Bionic Chip which paves the way for a speedy and fuss-free performance. With the presence of an 8 MP rear camera and a 7 MP FaceTime HD camera, you can even use your iPad to click picture-perfect shots and make clear video calls to your loved ones. This model also supports the Apple Pencil, so you can draw pictures, sign documents, and take notes easily.",
    brand: 'apple',
    category: 'Electronics',
    price: "45,650",
    countInStock: 3,
    rating: 4.6,
    numReviews: 4,
    brandlogo:'/images/shopping-cart-icon.png'
  },
  {
    _id: '13',
    name: 'NIKON AF Nikkor 50 mm f/1.8D Lens  (Black)',
    image: '/images/nikonlens.jpeg',
    description:
      "Breathtaking landscapes of an exotic place or precious moments spent with your loved ones deserve to be shot in the best possible way. Capture them in your Nikon camera with this AF Nikkor 50mm f/1.8D lens. Designed to deliver natural and sharp images, this versatile lens is perfect for portraits, travel and general photography.",
    brand: 'NIKON',
    category: 'Electronics',
    price: "5",
    countInStock: 2,
    rating: 4.6,
    numReviews: 9,
    brandlogo:'/images/shopping-cart-icon.png'
  },
  {
    _id: '14',
    name: 'SanDisk 128 GB Memory Card',
    image: '/images/sandiskmemorycard.jpeg',
    description:
      "Shot speeds up to 60MB/s*, transfer speeds up to 150MB/s* and other factors. 1Mb=1, 000, 000 bytes. X = 150Kb/sec.Perfect for shooting 4K UHD video) and sequential burst mode photograph Capture uninterrupted video with UHS speed Class 3 (U3) and video Speed Class 30 (v30)(2).",
    brand: 'Sandisk',
    category: 'Electronics',
    price: "12,589",
    countInStock: 2,
    rating: 4.7,
    numReviews: 4,
    brandlogo:'/images/shopping-cart-icon.png'
  },
  {
    _id: '15',
    name: 'ICREATOR 100W SuperFast Charger',
    image: '/images/icreatercharger.jpeg',
    description:
      "00W max output PD fast charger runs at super charging speed for PD devices from laptops, cell phones to tablets (e.g. MacBook Pro/Air/iPad Pro/iPhone 11 Pro). Built-in smart chip identifies automatically the voltage and current required by the device. Fully charge MacBook Pro 16'' in 1.9 hrs, MacBook Pro 15” in 1. 8 hrs, MacBook Air 2019 1.7 hrs. Three devices can be charged quickly at the same time with two type c ports (65W/30W) and one USB A port (30W)",
    brand: 'ICREATOR',
    category: 'Electronics',
    price: "4,999",
    countInStock: 7,
    rating: 4.7,
    numReviews: 3,
    brandlogo:'/images/shopping-cart-icon.png'
  },
  {
    _id: '17',
    name: 'Leef iBridge 3 Mobile Memory 64 GB OTG Drive',
    image: '/images/leefpendrive.jpeg',
    description:
      "Have you ever run out of memory on your iPhone or iPad while trying to capture the perfect photo or download a movie or app? Leef iBridge™ 3 external iOS memory drive empowers users to go do more by freeing up space on their iPhone & iPad. Go Do More with Leef iBridge™ 3: TRANSFER: Quickly move and share photos, movies, and documents off your iPhone or iPad to free up space STORE: Easily create an external library of your media for quick access without taking up space on your iPhone or iPad BACKUP",
    brand: 'Leef',
    category: 'Electronics',
    price: "5,459",
    countInStock: 8,
    rating: 4.1,
    numReviews: 5,
    brandlogo:'/images/shopping-cart-icon.png'
  },
  {
    _id: '18',
    name: 'Macally B079Y24YR3 Mobile Holder',
    image: '/images/macallyholder.jpeg',
    description:
      "Macally mobile holder made with Material Stainless Steel Compatible With iPad Pro, Tablets , Kindle Cell Phone , Pro Air Mini and it is a Clip type and it is Foldable",
    brand: 'Macally',
    category: 'Electronics',
    price: "4,459",
    countInStock: 7,
    rating: 4.0,
    numReviews: 3,
    brandlogo:'/images/shopping-cart-icon.png'
  },
  {
    _id: '19',
    name: 'acer 27 inch Full HD TN Panel Gaming Monitor (KG271)  (AMD Free Sync)',
    image: '/images/acermonitor.jpeg',
    description:
      "27 inch full HD (1920 x 1080) Widescreen TN Display 400 Nits Brightness with AMD Free Sync Technology .165Hz Refresh Rate (Overclok Mode) 0.7 MS Response Time. 1 X DVI Dual Link Up 1 X HDMI 1 X DP Ports with Inbox DP Cable .2W X 2 Stereo Speakers - Wall Mount Ready. AMD Radeon FreeSync Technology - Zero Frame Design",
    brand: 'acer',
    category: 'Electronics',
    price: "15,459",
    countInStock: 3,
    rating: 4.3,
    numReviews: 2,
    brandlogo:'/images/shopping-cart-icon.png'
  },
  {
    _id: '20',
    name: 'IQOO 3 (Quantum Silver, 128 GB)  (8 GB RAM)',
    image: '/images/iqoo3phone.jpeg',
    description:
      "Housing a Snapdragon 865 processor, 8 GB of LPDDR5 RAM, and a quad-camera setup, this iQOO smartphone is every gadget freak’s must-have device. This phone features a 16.36-cm (6.44) FHD+ E3 Super AMOLED display, which offers a vivid and lifelike viewing experience. This phone also sports pressure-sensitive Monster Touch buttons, making it perfect for gaming enthusiasts.",
    brand: 'IQOO',
    category: 'Electronics',
    price: "34,275",
    countInStock: 5,
    rating: 4.4,
    numReviews: 2,
    brandlogo:'/images/shopping-cart-icon.png'
  }
  


]

export default products
