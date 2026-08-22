import { Config } from '@remotion/cli/config';

Config.setStudioPort(3005);
Config.setVideoImageFormat('jpeg');
Config.setCrf(18);
Config.setCodec('h264');
Config.setPixelFormat('yuv420p');
Config.setOverwriteOutput(true);
