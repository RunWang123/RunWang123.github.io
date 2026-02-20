---
title: "Building CARLA (v0.9.15) from Source on Windows 11 with Visual Studio 2022: My Personal Guide & Tips"
date: 2026-02-20
permalink: /posts/2026/02/carla-install-windows11/
tags:
  - carla
  - autonomous vehicles
  - simulation
  - windows
  - tutorial
---

Building [CARLA](https://carla.org/), an open-source simulator for autonomous driving research, from source on Windows can be a daunting task. The maze of outdated guides, cryptic errors, and hours of compilation can leave even seasoned developers scratching their heads. This guide is based on [this excellent reference blog by wambitz](https://wambitz.github.io/tech-blog/carla/python/c++/simulation/autonomous-vehicles/2024/09/29/carla-win11.html), with my own personal experience, additional hints, and fixes for issues I encountered along the way.

> **Credit:** The original guide was written by [wambitz](https://wambitz.github.io/tech-blog/). I'm reposting key steps here and adding my own notes for issues I ran into.

---

## Why This Guide?

- **Up-to-Date:** Tailored for CARLA v0.9.15, Windows 11, and Visual Studio 2022.
- **Time-Saving:** Avoid common pitfalls and errors that took me hours or even days.
- **Personal Fixes:** I've added my own troubleshooting tips based on issues I encountered that weren't in the original guide.

---

## Prerequisites

### System Requirements

> **NOTE:** The build process can take **several hours** depending on your hardware. On a machine with the specs below, compiling CARLA took around **5+ hours**.

| Component | Requirement |
|-----------|-------------|
| OS | 64-bit Windows 10 or 11 |
| CPU | Quad-core Intel or AMD, 2.5 GHz or faster |
| RAM | 32 GB (recommended) |
| GPU | Dedicated GPU with at least 6 GB VRAM (8 GB recommended) |
| Disk Space | ~165 GB total (CARLA ~32 GB + UE4 ~133 GB) |
| TCP Ports | 2000 and 2001 must be open |

### Software Requirements

> **IMPORTANT:** If you have multiple Python versions installed, make sure **Python 3.8** can be found first. Python 3.10 won't work. **Do NOT use a virtual environment** for building the CARLA package.

Required tools:
- **Git** – for cloning repositories
- **CMake** – version **>= 3.15 and < 3.5x** (e.g., 3.28 is safe; CMake 3.5x and above may break the build)

  > ⚠️ **CMake Version Warning:** Use CMake **>= 3.15** but **< 3.50**. Newer CMake versions (3.5x+) are known to cause compatibility issues with the CARLA build system. You can download older CMake releases from [cmake.org/files](https://cmake.org/files/).
- **Make** – version 3.81 (strictly required)
- **7-Zip** – for extracting compressed files
- **Python 3.8 (64-bit)** – required for CARLA (avoid 32-bit versions)
- **Visual Studio 2022** – Community Edition is sufficient
- **Unreal Engine 4.26 (CARLA fork)** – custom version required

Ensure all software is added to the system's **PATH** environment variable.

### Python Dependencies

```bash
pip install --upgrade pip
pip install --user setuptools
pip install --user wheel
```

---

## Setting Up the Environment

### Install Dependencies

**Git:**
```bash
git --version
```

**CMake** (**>= 3.15, < 3.50** — e.g., 3.28 is safe):
```bash
cmake --version
# Must be >= 3.15 and < 3.50
```

**Make** (via Chocolatey, requires admin):
```bash
choco install make
make --version
```

**7-Zip:** Download and install from [7-zip.org](https://www.7-zip.org/).

**Python 3.8 (64-bit):** Download from [python.org](https://www.python.org/downloads/release/python-380/). Ensure it's added to PATH during installation.

```bash
python --version
pip --version
```

### Install Visual Studio 2022

> **IMPORTANT:** Do not install multiple versions of Visual Studio, as this may cause conflicts.

Download [Visual Studio 2022](https://visualstudio.microsoft.com/vs/) and select the following workloads:
- **Desktop Development with C++**
- **.NET Desktop Development**

Individual Components:
- **Windows 10 SDK** (for Windows 11, select the latest Windows 10 SDK)
- **C++ CMake Tools for Windows**

Complete the installation and restart your computer.

---

## Build Unreal Engine 4 for CARLA

> **NOTE:** You need access to the Epic Games GitHub organization. Link your GitHub and Epic Games accounts following [these instructions](https://www.unrealengine.com/en-US/ue-on-github).

**Clone the Repository:**

> **Keep the Unreal Engine folder path as close to `C:\` as possible.** Long paths can cause errors when running `Setup.bat` later.

```bash
git clone --depth 1 -b carla https://github.com/CarlaUnreal/UnrealEngine.git CarlaUE4
cd CarlaUE4
```

**Install Dependencies:**

> **NOTE:** If a Windows pop-up complains about an incompatible framework, select **Download** to install the required dependencies.

```bash
Setup.bat
GenerateProjectFiles.bat
```

### Compile the Engine

> **NOTE:** The build process can take **several hours**.

1. Open `UE4.sln` in `C:\CarlaUE4` with Visual Studio 2022.
2. Set **Configuration:** `Development Editor`, **Platform:** `Win64`.
3. In Solution Explorer, right-click `UE4` → **Build**.
4. After the build, navigate to `Engine\Binaries\Win64` and run `UE4Editor.exe` to verify.

---

## Building CARLA from Source

### Clone the CARLA Repository

```bash
git clone https://github.com/carla-simulator/carla.git -b 0.9.15 carla-0.9.15
cd carla-0.9.15
```

### Download Assets

> **NOTE:** If assets are missing at runtime (`make launch-only`), a segmentation fault will occur.

#### 🔧 Fix (Windows): Patch `Update.bat` Before Running It

> **⚠️ Personal Fix:** There are **two bugs** in `Update.bat` for CARLA 0.9.15 that you must fix before running it — a broken download URL and an incorrect 7-Zip command path. Both require editing the same file.

Open `C:\carla-0.9.15\Update.bat` in a text editor and apply the two patches below:

---

**Patch 1 — Fix the broken download URL (S3 → BackBlaze B2)**

Find the line:

```bat
set CONTENT_LINK=http://carla-assets.s3.amazonaws.com/%CONTENT_ID%.tar.gz
```

Replace it with:

```bat
set CONTENT_LINK=https://carla-assets.s3.us-east-005.backblazeb2.com/%CONTENT_ID%.tar.gz
```

> This fixes the silent download failure for CARLA 0.9.15 assets (asset ID `20231108_c5101a5`).

---

**Patch 2 — Fix the 7-Zip path (wrong command name)**

`Update.bat` calls `7zip` but the actual executable is `7z.exe`. Without this fix, extraction will fall back to `Expand-Archive` (PowerShell's built-in), which **does not support `.tar.gz`** and will throw:

```
Expand-Archive : .gz is not a supported archive file format.
```

Find the line that calls `7zip` (may look like):

```bat
7zip x ...
```

Replace `7zip` with the full path to your 7-Zip installation:

```bat
"C:\Program Files (x86)\7-Zip\7z.exe" x ...
```

> **Note:** If you installed 7-Zip to a different location, adjust the path accordingly. You can also add `C:\Program Files (x86)\7-Zip` to your system **PATH** so that `7z` is recognized globally — then the command just becomes `7z x ...`.

---

After applying both patches, save the file and run:

```bash
Update.bat
```

### Install Python Packages

> **IMPORTANT:** Do NOT compile CARLA in a virtual environment — this may cause a `B2.EXE` (Boost library) error. Use Python 3.8 system-wide.

```bash
python --version   # Should output: Python 3.8.XX
pip install wheel
pip list
pip --version
```

### Compile the Python API

> **NOTES:**
> - The build process defaults to Visual Studio 2019. Since we're using VS 2022, we need to specify it explicitly.
> - Ensure Python 3.8 is the top version in your system PATH.
> - This process takes around **30 minutes**.

> ❗ **You CANNOT run this in a regular `cmd` or PowerShell terminal.** You must use the **x64 Native Tools Command Prompt for VS 2022**, which sets up the correct compiler environment variables. Running in a regular terminal will cause cryptic build failures.
>
> **How to open it:** Start menu → type `x64` → select **"x64 Native Tools Command Prompt for VS 2022"**

Then run:

```bash
cd C:\carla-0.9.15
make PythonAPI GENERATOR="Visual Studio 17 2022"
```

### Troubleshooting: Boost Library Issues

If you encounter an error like:

```
LINK : fatal error LNK1104: cannot open file 'libboost_filesystem-vc142-mt-x64-1_80.lib'
```

**Explanation:** The Boost libraries were built with MSVC 14.2 (VS 2019), but you're using MSVC 14.3 (VS 2022). The linker expects Boost libraries for `vc143`.

**Solution:**

```bash
# Delete the current Boost installation
rm -r .\Build\boost-1.80.0-install\

# Reinstall Boost with the correct toolset
.\Util\InstallersWin\install_boost.bat --build-dir "C:\carla-0.9.15\Build\" --toolset msvc-14.3 --version 1.80.0 -j 32

# Rebuild the Python API
make PythonAPI
```

> `--toolset msvc-14.3` specifies the correct MSVC version. `-j 32` uses 32 cores for parallel compilation (adjust to your CPU).

#### Troubleshooting: `b2.exe` Boost Build Error

If instead you see:

```
-[install_boost]: [B2 ERROR] An error ocurred while installing using "b2.exe".
```

The root cause is a **VC toolset mismatch**: Boost 1.80's `bootstrap.bat` picks up the latest toolkit (`vc143`) automatically, but CARLA's build scripts hardcode `vc141`/`vc142` in two places, causing `b2` to fail.

**Fix — update the toolset to `vc143` in two files:**

1. `Util\BuildTools\Windows.mk` — around **line 75**, change any `vc141` or `vc142` reference to `vc143`.
2. `Util\InstallersWin\install_boost.bat` — around **line 109**, change the same.

Then retry:

```bat
make PythonAPI GENERATOR="Visual Studio 17 2022"
```

> *Credit: fix originally identified by [ThibaultFy](https://github.com/carla-simulator/carla/issues/21) (Aug 2021).*

### Troubleshooting: zlib Download Failure

If you see an error like `[install_zlib]: [CMAKE ERROR]` with a 404 or redirect failure, the zlib download URL in CARLA's script is broken — `zlib.net` no longer hosts the file and the backup URL returns a `301` redirect that PowerShell's `WebClient` won't follow.

**Fix — patch `install_zlib.bat` to use the GitHub archive:**

Open `C:\carla-0.9.15\Util\InstallersWin\install_zlib.bat`, find the line containing `ZLIB_REPO` (with `zlib.net`) and replace it with:

```bat
set ZLIB_REPO=https://github.com/madler/zlib/archive/refs/tags/v%ZLIB_VERSION%.zip
```

Then clean up the half-created folders and retry:

```bat
rmdir /s /q Build\zlib-source
rmdir /s /q Build\zlib-install
del /q Build\zlib-1.2.13.zip

make PythonAPI GENERATOR="Visual Studio 17 2022"
```

#### Still failing? Check your CMake version

If zlib downloads successfully but you still get a CMake error like:

```
Compatibility with CMake < 3.5 has been removed from CMake.
```

Your CMake is **too new**. CARLA's `CMakeLists.txt` uses `cmake_minimum_required` with a version below 3.5, which CMake ≥ 3.50 no longer supports.

**Fix:** Downgrade CMake to a version **>= 3.15 and < 3.50** (e.g., [3.28.6](https://cmake.org/files/v3.28/)). This matches the version constraint in the Prerequisites section above. After installing the older version, verify with:

```bat
cmake --version
```

Then clean up and retry `make PythonAPI` as above.

### Compile the CARLA Server

> **NOTE:** This step will take **2+ hours**.

```bash
make CarlaUE4Editor GENERATOR="Visual Studio 17 2022"
```

Output files will be created at: `C:\carla-0.9.15\PythonAPI\carla\dist`

### Troubleshooting: OSM2ODR CMake "x64" Path Error

If you see:

```
CMake Error: The source directory ".../Build/osm2odr-visualstudio/x64" does not exist.
Ignoring extra path from command line: "...\Build\om2odr-source""
```

The build script is passing `x64` as a positional argument instead of an architecture flag, so CMake treats it as the source directory.

**Fix — edit `BuildOSM2ODR.bat` to use `-A x64`:**

Open `C:\carla-0.9.15\Util\BuildTools\BuildOSM2ODR.bat` and find the CMake configure line (containing `-G %GENERATOR% %PLATFORM%`). Change `%PLATFORM%` to `-A x64`:

```bat
cmake -G %GENERATOR% -A x64^
```

Then clean the broken dirs and retry:

```bat
rmdir /s /q Build\osm2odr-visualstudio
rmdir /s /q Build\osm2odr-source
rmdir /s /q Build\om2odr-source

make PythonAPI GENERATOR="Visual Studio 17 2022"
```

### Troubleshooting: "Unreal Engine Not Detected" / `UE4_ROOT` Not Set

If you see:

```
ERROR: The system was unable to find the specified registry key or value.
-[BuildCarlaUE4]: [ERROR] Unreal Engine not detected
```

CARLA cannot find the UE4.26 CARLA fork. It checks the `UE4_ROOT` environment variable first, then falls back to a Windows registry entry — which usually doesn't exist.

**Fix — set `UE4_ROOT` to point to your Unreal Engine install:**

> **📁 Your path will be different!** `UE4_ROOT` must point to wherever **you** cloned the CARLA UE4 fork. The example below uses `C:\CarlaUE4` (recommended — short path avoids issues), but substitute your actual install location.

```bat
:: Replace C:\CarlaUE4 with YOUR actual UE4 clone directory
:: For the current session only
set UE4_ROOT=C:\CarlaUE4

:: To persist across all terminals (run once)
setx UE4_ROOT "C:\CarlaUE4"
```

For example, if you cloned UE4 to `D:\UnrealEngine\CarlaUE4`, use that path instead:

```bat
setx UE4_ROOT "D:\UnrealEngine\CarlaUE4"
```

Verify it points to the right place (you should see `UE4Editor.exe` in the output):

```bat
echo %UE4_ROOT%
dir "%UE4_ROOT%\Engine\Binaries\Win64\UE4Editor.exe"
```

> **`UE4_ROOT` must point to the root folder** (the one containing `Engine\`), **not** to `Engine\Binaries\Win64` itself.

> **Haven't built UE4 yet?** Go back to the [Build Unreal Engine 4 for CARLA](#build-unreal-engine-4-for-carla) section — the CARLA-specific fork (`-b carla`) must be fully compiled before this step will work.



---

## Launching the CARLA Simulator

### Changing the Default Map (Optional)

By default, CARLA loads `Town10HD_Opt`, which is large and resource-intensive. To switch to a lighter map like `Town02`:

Edit `Unreal\CarlaUE4\Config\DefaultEngine.ini`:

```ini
[/Script/EngineSettings.GameMapsSettings]
EditorStartupMap=/Game/Carla/Maps/Town02.Town02
GameDefaultMap=/Game/Carla/Maps/Town02.Town02
ServerDefaultMap=/Game/Carla/Maps/Town02.Town02
GlobalDefaultGameMode=/Game/Carla/Blueprints/Game/CarlaGameMode.CarlaGameMode_C
GameInstanceClass=/Script/Carla.CarlaGameInstance
TransitionMap=/Game/Carla/Maps/Town02.Town02
GlobalDefaultServerGameMode=/Game/Carla/Blueprints/Game/CarlaGameMode.CarlaGameMode_C
```

### Launch the CARLA Server

> **NOTE:** It might seem like the simulation gets stuck at 95%, but it's not. On my machine, it took around **20 minutes** to open the Editor and another **30 minutes** to start the simulation due to shader compilation (this only happens once — subsequent launches are much faster due to caching).

```bash
make launch-only
```

Then click **Play** in the Unreal Editor to start the simulation. You can move around using **WASD** keys and look around with the mouse.

---

## Running the CARLA Client

### Creating a Python Virtual Environment

> **IMPORTANT:** Do NOT create a virtual environment until the **build process is complete** to avoid errors. Ensure Python 3.8 is used.

```bash
py -3.8 -m venv .venv
.\.venv\Scripts\activate
```

### Installing the CARLA Package

```bash
cd C:\carla-0.9.15\PythonAPI\carla\dist
pip install .\carla-0.9.15-cp38-cp38-win_amd64.whl
```

### Installing Example Dependencies

```bash
cd C:\carla-0.9.15\PythonAPI\examples
pip install -r requirements.txt
```

### Starting Traffic Simulation

> **NOTE:** Ensure the CARLA server is running before executing client scripts.

```bash
python generate_traffic.py
```

You should now see traffic in the simulation!

---

## My Personal Tips & Fixes

> 🔧 **[Your additional tips and fixes go here]**

*I will update this section with my own experience and workarounds for issues I encountered beyond the original guide.*

<!-- TODO: Add personal tips here -->

---

## Conclusion

Congratulations! You've successfully built and run CARLA on Windows 11 using Visual Studio 2022. By following this guide (and its original source), you've saved yourself hours of troubleshooting.

---

## Additional Resources

- [Official CARLA Documentation](https://carla.readthedocs.io/)
- [CARLA GitHub Repository](https://github.com/carla-simulator/carla)
- [Unreal Engine on GitHub](https://www.unrealengine.com/en-US/ue-on-github)
- [CARLA Forum](https://github.com/carla-simulator/carla/discussions)
- [Python 3.8 Downloads](https://www.python.org/downloads/release/python-380/)
- [Visual Studio 2022](https://visualstudio.microsoft.com/vs/)
- [CMake Documentation](https://cmake.org/documentation/)
- [Original Guide by wambitz](https://wambitz.github.io/tech-blog/carla/python/c++/simulation/autonomous-vehicles/2024/09/29/carla-win11.html)
