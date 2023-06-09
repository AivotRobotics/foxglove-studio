// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { LayoutData } from "@foxglove/studio-base/context/CurrentLayoutContext/actions";
import { defaultPlaybackConfig } from "@foxglove/studio-base/providers/CurrentLayoutProvider/reducers";

export const aivotLayout: LayoutData = {
    configById: {
        "3D!18i6zy7": {
            "cameraState": {
                "perspective": true,
                "distance": 10.807201753248387,
                "phi": 77.03816793893328,
                "thetaOffset": -142.4198473282468,
                "targetOffset": [
                    -0.037111553365573015,
                    -0.05871519437946665,
                    -1.8984223899984096e-16
                ],
                "target": [
                    0,
                    0,
                    0
                ],
                "targetOrientation": [
                    0,
                    0,
                    0,
                    1
                ],
                "fovy": 45,
                "near": 0.5,
                "far": 5000
            },
            "followMode": "follow-none",
            "followTf": "world",
            "scene": {
                "meshUpAxis": "z_up",
                "ignoreColladaUpAxis": true
            },
            transforms: {
                "frame:world": {
                    "visible": false
                },
                "frame:base_link": {
                    "visible": false
                },
                "frame:virtual_wheels_link": {
                    "visible": false
                },
                "frame:back_frame_link": {
                    "visible": false
                },
                "frame:lf_frame_link": {
                    "visible": false
                },
                "frame:lower_frame_link": {
                    "visible": false
                },
                "frame:left_ctrl_box_link": {
                    "visible": false
                },
                "frame:right_ctrl_box_link": {
                    "visible": false
                },
                "frame:upper_frame_link": {
                    "visible": false
                },
                "frame:robot_mount_link": {
                    "visible": false
                },
                "frame:camdn_segGimbalStem": {
                    "visible": false
                },
                "frame:camdn_segGimbalNeck": {
                    "visible": false
                },
                "frame:camdn_bottom_screw_frame": {
                    "visible": false
                },
                "frame:camdn_link": {
                    "visible": false
                },
                "frame:camup_segGimbalStem": {
                    "visible": false
                },
                "frame:camup_segGimbalNeck": {
                    "visible": false
                },
                "frame:camup_bottom_screw_frame": {
                    "visible": false
                },
                "frame:camup_link": {
                    "visible": false
                },
                "frame:camup_lower_mount": {
                    "visible": false
                },
                "frame:camup_upper_mount": {
                    "visible": false
                },
                "frame:left_mount_plate_link": {
                    "visible": false
                },
                "frame:lf_base": {
                    "visible": false
                },
                "frame:lf_base_link": {
                    "visible": false
                },
                "frame:lf_shoulder_link": {
                    "visible": false
                },
                "frame:lf_upper_arm_link": {
                    "visible": false
                },
                "frame:lf_forearm_link": {
                    "visible": false
                },
                "frame:lf_wrist_1_link": {
                    "visible": false
                },
                "frame:lf_wrist_2_link": {
                    "visible": false
                },
                "frame:lf_wrist_3_link": {
                    "visible": false
                },
                "frame:lf_ee_link": {
                    "visible": false
                },
                "frame:left_gripper_coupling_link": {
                    "visible": false
                },
                "frame:left_hand_palm": {
                    "visible": false
                },
                "frame:left_hand_finger_1_link_0": {
                    "visible": false
                },
                "frame:left_hand_finger_1_link_1": {
                    "visible": false
                },
                "frame:left_hand_finger_1_link_2": {
                    "visible": false
                },
                "frame:left_hand_finger_1_link_3": {
                    "visible": false
                },
                "frame:left_hand_finger_2_link_0": {
                    "visible": false
                },
                "frame:left_hand_finger_2_link_1": {
                    "visible": false
                },
                "frame:left_hand_finger_2_link_2": {
                    "visible": false
                },
                "frame:left_hand_finger_middle_link_0": {
                    "visible": false
                },
                "frame:left_hand_finger_2_link_3": {
                    "visible": false
                },
                "frame:left_hand_finger_middle_link_1": {
                    "visible": false
                },
                "frame:left_hand_finger_middle_link_2": {
                    "visible": false
                },
                "frame:left_hand_finger_middle_link_3": {
                    "visible": false
                },
                "frame:left_hand_tool0": {
                    "visible": false
                },
                "frame:left_gripper_tcp": {
                    "visible": false
                },
                "frame:lf_hand_cam_bottom_screw_frame": {
                    "visible": false
                },
                "frame:lf_hand_cam_depth_frame": {
                    "visible": false
                },
                "frame:lf_hand_cam_link": {
                    "visible": false
                },
                "frame:lf_tool0": {
                    "visible": false
                },
                "frame:rt_base_link": {
                    "visible": false
                },
                "frame:right_mount_plate_link": {
                    "visible": false
                },
                "frame:rt_base": {
                    "visible": false
                },
                "frame:rt_shoulder_link": {
                    "visible": false
                },
                "frame:rt_upper_arm_link": {
                    "visible": false
                },
                "frame:rt_forearm_link": {
                    "visible": false
                },
                "frame:rt_wrist_1_link": {
                    "visible": false
                },
                "frame:rt_wrist_2_link": {
                    "visible": false
                },
                "frame:rt_wrist_3_link": {
                    "visible": false
                },
                "frame:rt_ee_link": {
                    "visible": false
                },
                "frame:right_hand_robotiq_arg2f_base_link": {
                    "visible": false
                },
                "frame:right_gripper_coupling_link": {
                    "visible": false
                },
                "frame:right_hand_left_inner_knuckle": {
                    "visible": false
                },
                "frame:right_hand_left_outer_knuckle": {
                    "visible": false
                },
                "frame:right_hand_left_outer_finger": {
                    "visible": false
                },
                "frame:right_hand_left_inner_finger": {
                    "visible": false
                },
                "frame:right_hand_left_inner_finger_pad": {
                    "visible": false
                },
                "frame:right_hand_right_inner_knuckle": {
                    "visible": false
                },
                "frame:right_hand_right_outer_knuckle": {
                    "visible": false
                },
                "frame:right_hand_right_outer_finger": {
                    "visible": false
                },
                "frame:right_hand_right_inner_finger": {
                    "visible": false
                },
                "frame:right_hand_right_inner_finger_pad": {
                    "visible": false
                },
                "frame:right_gripper_tcp": {
                    "visible": false
                },
                "frame:rt_hand_cam_actual_bottom_screw_frame": {
                    "visible": false
                },
                "frame:rt_hand_cam_actual_depth_frame": {
                    "visible": false
                },
                "frame:rt_hand_cam_actual_link": {
                    "visible": false
                },
                "frame:rt_hand_cam_link": {
                    "visible": false
                },
                "frame:rt_tool0": {
                    "visible": false
                },
                "frame:rt_frame_link": {
                    "visible": false
                }
            },
            topics: {
                "param:/robot_description": {
                    "visible": true
                },
                "/camera/depth/color/points": {
                    "visible": true
                },
                "/aivot_motion/vision_objects": {
                    "visible": true
                }
            },
            layers: {
                "e987d801-d92d-4a0e-8fb9-c85b0aae06ca": {
                    "visible": true,
                    "frameLocked": true,
                    "label": "Grid",
                    "instanceId": "e987d801-d92d-4a0e-8fb9-c85b0aae06ca",
                    "layerId": "foxglove.Grid",
                    "size": 10,
                    "divisions": 10,
                    "lineWidth": 1,
                    "color": "#248eff",
                    "position": [
                        0,
                        0,
                        0
                    ],
                    "rotation": [
                        0,
                        0,
                        0
                    ],
                    "order": 1
                }
            },
            "publish": {
                "type": "point",
                "poseTopic": "/move_base_simple/goal",
                "pointTopic": "/clicked_point",
                "poseEstimateTopic": "/initialpose",
                "poseEstimateXDeviation": 0.5,
                "poseEstimateYDeviation": 0.5,
                "poseEstimateThetaDeviation": 0.26179939
            },
            "imageMode": {}
        },
        "AivotChatbot!25q69so": {},
    },
    globalVariables: {},
    userNodes: {},
    playbackConfig: { ...defaultPlaybackConfig },
    layout: {
        direction: "row",
        first: "3D!18i6zy7",
        second: "AivotChatbot!25q69so",
        splitPercentage: 60
    },
} as const;
