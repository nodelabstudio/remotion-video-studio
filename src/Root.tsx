import React from "react";
import { Composition } from "remotion";
import { DemoVideo } from "./DemoVideo";
import { ThreePhones } from "./ThreePhones";
import { demoVideoSchema } from "./schema";
import { threePhonesSchema } from "./threePhonesSchema";
import { AppStoreCard, calculateAppStoreCardMetadata } from "./AppStoreCard";
import { appStoreCardSchema } from "./appStoreCardSchema";
import { MultiSceneVideo } from "./MultiSceneVideo";
import { multiSceneSchema, MultiSceneProps } from "./multiSceneSchema"; // Import MultiSceneProps

// Helper function to calculate metadata for MultiSceneVideo
const calculateMultiSceneVideoMetadata = (props: MultiSceneProps) => {
  const totalDuration = (props.scenes || [])
    .filter(scene => scene.isActive)
    .reduce((sum, scene) => sum + (scene.durationInFrames || 0), 0); // Use 0 as default if durationInFrames is missing

  return {
    durationInFrames: totalDuration > 0 ? totalDuration : 1, // Ensure a minimum duration of 1 frame
  };
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* MultiSceneVideo - Temporarily commented out by user request
      <Composition
        id="MultiSceneVideo"
        component={MultiSceneVideo}
        durationInFrames={null} // Set to null to indicate dynamic calculation
        fps={30}
        width={1920}
        height={1080}
        schema={multiSceneSchema}
        calculateMetadata={calculateMultiSceneVideoMetadata} // Use the helper function
        defaultProps={{
          scenes: [
            {
              isActive: true,
              videoFile: "none",
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
              durationInFrames: 300, // Add duration for the default scene
            },
          ],
        }}
      />
      */}

      {/* 16:9 Landscape (YouTube, website) */}
      <Composition
        id="DemoVideo"
        component={DemoVideo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        schema={demoVideoSchema}
        defaultProps={{
          isActive: true,
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
          headerText: "Habit Tracker",
          subtitle: "Build better habits, one day at a time",
          bulletPoints: [
            "Track your daily habits",
            "Build streaks for consistency",
            "Set custom reminders",
            "View progress analytics",
          ],
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
        }}
      />

      {/* 9:16 Vertical (TikTok, Reels, Stories) */}
      <Composition
        id="DemoVideo-Vertical"
        component={DemoVideo}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
        schema={demoVideoSchema}
        defaultProps={{
          isActive: true,
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
          headerText: "Habit Tracker",
          subtitle: "Build better habits, one day at a time",
          bulletPoints: [
            "Track your daily habits",
            "Build streaks for consistency",
            "Set custom reminders",
            "View progress analytics",
          ],
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
        }}
      />

      {/* 1:1 Square (Instagram feed) */}
      <Composition
        id="DemoVideo-Square"
        component={DemoVideo}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1080}
        schema={demoVideoSchema}
        defaultProps={{
          isActive: true,
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
          headerText: "Habit Tracker",
          subtitle: "Build better habits, one day at a time",
          bulletPoints: [
            "Track your daily habits",
            "Build streaks for consistency",
            "Set custom reminders",
            "View progress analytics",
          ],
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
        }}
      />

      {/* 4:5 Portrait (Instagram optimal) */}
      <Composition
        id="DemoVideo-Portrait"
        component={DemoVideo}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1350}
        schema={demoVideoSchema}
        defaultProps={{
          isActive: true,
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
          headerText: "Habit Tracker",
          subtitle: "Build better habits, one day at a time",
          bulletPoints: [
            "Track your daily habits",
            "Build streaks for consistency",
            "Set custom reminders",
            "View progress analytics",
          ],
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
        }}
      />

      {/* ThreePhones - Temporarily commented out by user request
      <Composition
        id="ThreePhones"
        component={ThreePhones}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
        schema={threePhonesSchema}
        defaultProps={{
          presetName: "none",
          screen1: "screens/01_home_size.png",
          screen2: "screens/02_customize_tasks.png",
          screen3: "screens/03_room_select_exclude.png",
          spacing: 120,
          scale: 1,
          centerScale: 1,
          sideScale: 1,
          angle: 30,
          backgroundPreset: "lightGray",
          bezelColor: "silver",
          layoutMode: "3d",
        }}
      />
      */}

      <Composition
        id="AppStoreCard"
        component={AppStoreCard}
        durationInFrames={1}
        fps={30}
        width={1290}
        height={2796}
        schema={appStoreCardSchema}
        calculateMetadata={calculateAppStoreCardMetadata}
        defaultProps={{
          presetName: "none",
          screenshotSize: "iPhone 6.7\" (1290x2796)",
          screenFile: "screens/placeholder.png",
          headlineText: "Build better habits with a simple daily tracker",
          headlineFontSize: 80,
          fontWeight: "bold",
          fontFamily: "Roboto",
          textColor: "auto",
          textShadowIntensity: "subtle",
          headerOffsetY: 0,
          phoneOffsetY: 0,
          bezelStyle: "iphone16pro",
          bezelColor: "gold",
          phoneScale: 0.9,
          backgroundPreset: "sunset",
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
        }}
      />
    </>
  );
};
