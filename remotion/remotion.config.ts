import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
// The look is flat colour and type, not film grain and gradients, so a high
// JPEG quality costs little and keeps the type edges clean.
Config.setJpegQuality(95);
