import { Sequence } from "remotion";
import { z } from "zod";
import { DemoVideo } from "./DemoVideo";
import { multiSceneSchema } from "./multiSceneSchema";
import { DemoVideoProps } from "./schema";

const DEMO_SCENE_DEFAULTS: DemoVideoProps = {
  isActive: true,
  durationInFrames: 300,
  videoFile: "none",
  presetName: "none",
  bezelStyle: "slim",
  bezelColor: "silver",
  animationType: "dropAndSlide",
  animationSpeed: "normal",
  animationDelay: 0,
  showAppIcon: true,
  appIconFile: "app_logo_small.png",
  appIconSize: 70,
  showAppStoreButton: true,
  headerText: "Default Scene",
  subtitle: "Edit this scene in the JSON editor",
  bulletPoints: ["Add your content here"],
  textShadowIntensity: "subtle",
  headerFontSize: 60,
  subtitleFontSize: 30,
  fontWeight: "bold",
  fontFamily: "Roboto",
  audioFile: "none",
  audioVolume: 0.5,
  backgroundPreset: "lightGray",
  backgroundType: "gradient",
  backgroundFile: "none",
  useCustomBackground: false,
  startColorR: 102,
  startColorG: 126,
  startColorB: 234,
  endColorR: 118,
  endColorG: 75,
  endColorB: 162,
  customGradientAngle: 135,
  shadowIntensity: "medium",
  lightAngle: "topLeft",
  showReflection: true,
  reflectionIntensity: "subtle",
  exitAnimationType: "none",
  exitAnimationStart: 30,
  enableFloating: false,
  floatingIntensity: "subtle",
};

export const MultiSceneVideo = (props: z.infer<typeof multiSceneSchema>) => {
  const scenesToRender = props.scenes && props.scenes.length > 0 ? props.scenes : [{ ...DEMO_SCENE_DEFAULTS }];
  const activeScenes = scenesToRender.filter((scene) => scene.isActive);

  return (
    <>
      {activeScenes.map((scene, index) => {
        // Calculate the starting frame by summing durations of all previous scenes
        const from = activeScenes
          .slice(0, index)
          .reduce((sum, s) => sum + (s.durationInFrames || DEMO_SCENE_DEFAULTS.durationInFrames), 0);
        
        const duration = scene.durationInFrames || DEMO_SCENE_DEFAULTS.durationInFrames;
        
        return (
          <Sequence key={index} from={from} durationInFrames={duration}>
            <DemoVideo {...scene} durationInFrames={duration} />
          </Sequence>
        );
      })}
    </>
  );
};
