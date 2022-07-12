import { READABLE_FOLDER } from '@env/index.ts';

export async function allowedReadFile(context, next) {
    const pathname = context.request.url.pathname;
    const canRead = READABLE_FOLDER.some(item => pathname.startsWith(`/${item}/`));
    try {
        if(canRead) {
            await context.send({ root: `./` });
        } else {
          await next();
        }
    } catch(e) {
        console.log('error', e)
      await next();
    }
};