const ImageComponent = (imageIds) => {
    const [images, setImages] = React.useState([])
  
    React.useEffect(() => {
      async function getImage (id) {
        let imageBlob
        try {
          imageBlob = (await axiosClient.get(`https://allphanesusernode.herokuapp.com/Allphanesuserpost/allphanpostandgellaey/1648015523912.jpg}`, { responseType: 'blob' })).data
        } catch (err) {
          return null
        }
        return URL.createObjectURL(imageBlob)
      }
      async function getImages () {
        const imageArray = []
        for (const id of imageIds) {
          imageArray.push(await getImage(id))
        }
        setImages(imageArray)
      }
  
      getImages()
    }, [imageIds])
  
    return images.map((img, i) => {
      return <img src={img} alt={`image-${i}`} key={i} />
    })
  }

//   2. 
<figure><img src={`https://allphanesusernode.herokuapp.com/Allphanesuserpost/allphanpostandgellaey/1648015523912.jpg`} alt="" /></figure>

// https://allphanesusernode.herokuapp.com/Allphanesuserpost/allphanpostandgellaey/1648015523912.jpg