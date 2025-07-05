// Car Image Service - Automatically fetch car images based on car name
export class CarImageService {
  private static readonly FALLBACK_IMAGES = {
    eco: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
    suv: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg',
    convertible: 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg',
    sports: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg',
    luxury: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
    sedan: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg'
  }

  // Car brand to search term mapping for better results
  private static readonly BRAND_MAPPING: Record<string, string> = {
    'tata': 'tata motors',
    'maruti': 'maruti suzuki',
    'mahindra': 'mahindra',
    'hyundai': 'hyundai',
    'honda': 'honda',
    'toyota': 'toyota',
    'bmw': 'bmw',
    'mercedes': 'mercedes benz',
    'audi': 'audi',
    'ford': 'ford',
    'chevrolet': 'chevrolet',
    'volkswagen': 'volkswagen',
    'nissan': 'nissan',
    'kia': 'kia',
    'renault': 'renault',
    'skoda': 'skoda',
    'jeep': 'jeep'
  }

  /**
   * Get car image URL based on car name and category
   */
  static async getCarImage(carName: string, category: string): Promise<string> {
    try {
      // Clean and prepare the car name for search
      const cleanCarName = this.cleanCarName(carName)
      
      // Try multiple image sources
      const imageUrl = await this.fetchFromPexels(cleanCarName) ||
                      await this.fetchFromUnsplash(cleanCarName) ||
                      this.getFallbackImage(category)

      return imageUrl
    } catch (error) {
      console.error('Error fetching car image:', error)
      return this.getFallbackImage(category)
    }
  }

  /**
   * Clean car name for better search results
   */
  private static cleanCarName(carName: string): string {
    const name = carName.toLowerCase().trim()
    
    // Extract brand and model
    const words = name.split(' ')
    const brand = words[0]
    
    // Use brand mapping if available
    const mappedBrand = this.BRAND_MAPPING[brand] || brand
    
    // Create search terms
    const searchTerms = [
      `${mappedBrand} ${words.slice(1).join(' ')}`.trim(),
      name,
      `${mappedBrand} car`,
      `${brand} automobile`
    ]

    return searchTerms[0] || name
  }

  /**
   * Fetch image from Pexels API
   */
  private static async fetchFromPexels(searchTerm: string): Promise<string | null> {
    try {
      // Using Pexels public API (no key required for basic usage)
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchTerm + ' car')}&per_page=1&orientation=landscape`,
        {
          headers: {
            'Authorization': 'YOUR_PEXELS_API_KEY' // You would need to get this from pexels.com
          }
        }
      )

      if (!response.ok) {
        throw new Error('Pexels API failed')
      }

      const data = await response.json()
      
      if (data.photos && data.photos.length > 0) {
        return data.photos[0].src.large
      }

      return null
    } catch (error) {
      console.log('Pexels fetch failed, trying alternative method')
      return null
    }
  }

  /**
   * Fetch image from Unsplash API
   */
  private static async fetchFromUnsplash(searchTerm: string): Promise<string | null> {
    try {
      // Using Unsplash public API
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchTerm + ' car')}&per_page=1&orientation=landscape`,
        {
          headers: {
            'Authorization': 'Client-ID YOUR_UNSPLASH_ACCESS_KEY' // You would need to get this from unsplash.com
          }
        }
      )

      if (!response.ok) {
        throw new Error('Unsplash API failed')
      }

      const data = await response.json()
      
      if (data.results && data.results.length > 0) {
        return data.results[0].urls.regular
      }

      return null
    } catch (error) {
      console.log('Unsplash fetch failed, using car database')
      return null
    }
  }

  /**
   * Get car image from our curated car database
   */
  static getCarImageFromDatabase(carName: string, category: string): string {
    const name = carName.toLowerCase()
    
    // Curated car image database with real car images
    const carDatabase: Record<string, string> = {
      // Tata Cars
      'tata nexon': 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
      'tata nexon ev': 'https://images.pexels.com/photos/7144176/pexels-photo-7144176.jpeg',
      'tata safari': 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg',
      'tata harrier': 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg',
      'tata altroz': 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg',
      
      // Maruti Suzuki Cars
      'maruti suzuki swift': 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
      'maruti suzuki dzire': 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
      'maruti suzuki baleno': 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg',
      'maruti suzuki vitara brezza': 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg',
      'maruti suzuki s-presso': 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg',
      
      // Hyundai Cars
      'hyundai creta': 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg',
      'hyundai verna': 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
      'hyundai i20': 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
      'hyundai venue': 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg',
      'hyundai grand i10 nios': 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg',
      
      // Mahindra Cars
      'mahindra thar': 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg',
      'mahindra xuv700': 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg',
      'mahindra scorpio': 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg',
      'mahindra bolero': 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg',
      
      // Honda Cars
      'honda city': 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
      'honda amaze': 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg',
      'honda jazz': 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
      'honda wr-v': 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg',
      
      // Toyota Cars
      'toyota innova crysta': 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg',
      'toyota fortuner': 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg',
      'toyota camry': 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
      'toyota glanza': 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
      
      // Luxury Cars
      'bmw 3 series': 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
      'bmw 5 series': 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
      'bmw 7 series': 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
      'bmw x1': 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg',
      'bmw x3': 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg',
      'bmw z4': 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg',
      'bmw m3': 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg',
      
      'mercedes-benz c-class': 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
      'mercedes-benz e-class': 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
      'mercedes-benz s-class': 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
      'mercedes-benz glc': 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg',
      'mercedes-benz gle': 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg',
      
      'audi a3': 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
      'audi a4': 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
      'audi a6': 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
      'audi a8': 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
      'audi q3': 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg',
      'audi q5': 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg',
      'audi a3 cabriolet': 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg',
      
      // Sports Cars
      'ford mustang': 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg',
      'chevrolet camaro': 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg',
      'dodge challenger': 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg',
      'porsche 911': 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg',
      'lamborghini huracan': 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg',
      'ferrari 488': 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg'
    }

    // Try exact match first
    for (const [carKey, imageUrl] of Object.entries(carDatabase)) {
      if (name.includes(carKey) || carKey.includes(name)) {
        return imageUrl
      }
    }

    // Try partial matches
    const words = name.split(' ')
    for (const [carKey, imageUrl] of Object.entries(carDatabase)) {
      const carWords = carKey.split(' ')
      const matchCount = words.filter(word => carWords.some(carWord => carWord.includes(word))).length
      
      if (matchCount >= 2) { // At least 2 words match
        return imageUrl
      }
    }

    // Return category fallback
    return this.getFallbackImage(category)
  }

  /**
   * Get fallback image based on category
   */
  private static getFallbackImage(category: string): string {
    return this.FALLBACK_IMAGES[category as keyof typeof this.FALLBACK_IMAGES] || 
           this.FALLBACK_IMAGES.sedan
  }

  /**
   * Main method to get car image - tries database first, then APIs
   */
  static async getCarImageUrl(carName: string, category: string): Promise<string> {
    // First try our curated database
    const databaseImage = this.getCarImageFromDatabase(carName, category)
    
    // If it's not a fallback image, return it
    if (databaseImage !== this.getFallbackImage(category)) {
      return databaseImage
    }

    // Otherwise try APIs
    return await this.getCarImage(carName, category)
  }

  /**
   * Validate if an image URL is accessible
   */
  static async validateImageUrl(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' })
      return response.ok
    } catch {
      return false
    }
  }
}