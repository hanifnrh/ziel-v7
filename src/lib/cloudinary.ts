import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { dpr } from '@cloudinary/url-gen/actions/delivery';

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME
  },
});

export function getHeroBackgroundUrl(publicId: string) {
  const myImage = cld.image(publicId);

  myImage
    .resize(fill().width(1920).height(1080).gravity(autoGravity()))
    .delivery(format('auto')) // f_auto
    .delivery(quality('auto:best')) // q_auto:best
    .delivery(dpr('auto')); // dpr_auto

  return myImage.toURL();
}