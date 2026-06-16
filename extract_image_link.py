import yt_dlp

def extract_image_urls(url):
    print("extracting image data from url".upper())

    ydl_opts = {
        "skip_download": True,
        "quiet": True,
    }

    try:

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            print("url data extracted !".upper())

        images = []

        if info.get("thumbnail"):
            print("got first thumbnail...")
            images.append(info["thumbnail"])

            print("returning available thumbnails to download !".upper())
            return list(dict.fromkeys(images))
        
        else:
            print("no main thumbnail proceeding to thumbnails".upper())
            return None
    
        for thumbnail in info.get("thumbnails", ""):
            print("geting subseqeunt thumbnails...")
    
            if thumbnail.get("url"):
                images.append(thumbnail["url"])
    
        # creates a dictionary using the keys in images array with value none
        # reconverts back to list leaving the values none and returning only the image url
        # return images
        return list(dict.fromkeys(images))
    
    
    except Exception as e:
        print("an error ocuured while processing url : ")
        print(e)

        return None
            