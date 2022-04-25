---
title: "Snake Game in Minutes with Flutter"
date: 2022-04-24T21:52:20+05:30
showToc: true
tags: ["project", "flutter", "game", "beginner", "mini project"]
cover:
    image: "images/snake_game.gif"
---

## Introduction

Snake game is probably one of the most known video games in the world and I have built it multiple times, why? Because it’s a good intro project to any new language or framework. I have built it with Python, C++, Javascript, and Dart (Flutter). I frequently use it as an example when I’m teaching someone the basics of a language/framework.

In this tutorial, we’ll build the Snake Game with Flutter. Some interesting things we’ll cover:

1. Object-Oriented Design
2. No frameworks - No game engines or third party libraries
3. Flaws and Future Follow Ups

Things that aren’t covered well:

1. `Structuring a Flutter project` - We’ll do it in one single file (executable on dartpad.dev)
2. `UI/UX` - No menu, UI, glyphs, etc.
3. `Scoring` - Because it doesn't add value to project.

**Let’s start:**

For any simple single-player game, I usually start by thinking the following, step by step:

1. `Objects`: What are the moving parts of the game, and which objects matter for building the MPG (Minimum Playable Game). In our game, they are the Snake and it's food.
2. `State`: The state of the game and connecting the objects. In the snake game, the state is a grid, wherein the snake and food will be. We’ll draw these using simple containers.
3. `Update State`: The snake has to continually move forward which is a periodic update, and based on this (and the user input) the objects will have to respond to different states like snake eating the food, snake biting itself, snake hitting the wall, changing direction, etc.
4. `Controls`: User controls; In our case, change the direction of the snake based on input (arrow keys to set the direction).
5. `Score`: Score calculation and reset - number of food eaten. (not implemented in this tutorial though)

So having these things sorted, let’s code!

## Foundation

We start with a stateless widget `SnakeGame` to define our `MaterialApp`. Followed by a stateful widget `Game` which would render our game and manage the `State`.

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const SnakeGame());
}

class SnakeGame extends StatelessWidget {
  const SnakeGame({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: "Snake Game",
      home: Center(
        child: Game(),
      ),
    );
  }
}

class Game extends StatefulWidget {
  const Game({Key? key}) : super(key: key);

  @override
  State<Game> createState() => _GameState();
}

class _GameState extends State<Game> {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 500, // Update with constants in next step
      height: 500, // Update with constants in next step
      color: Colors.black,
    );
	}
}
```

Since we’ll need a few constants, let’s define a `Constants` class to access/modify them easily. Right now, we need 2 constants, `canvasSize` (height and width of the canvas) and `blockSize` (size of 1 block) so that we can imagine our canvas as a grid of side `canvasSize/blockSize` elements.

```dart
class Constants {
  // Canvas
  static const double canvasSize = 500;
  static const double blockSize = 10;
}
```

After replacing height and width in the `GameState` with `Constants.canvasSize` we have a 50x50 imaginary grid to work with.

{{< figure align=center src="https://raw.githubusercontent.com/yashlamba/portfolio/master/assets/empty_canvas.png" width="50%" caption="Empty Canvas">}}

## Models/Objects

Let's start with our Snake; To represent the snake we’ll use a List of 2D points, and the number of points increases when the snake eats food. The first element of the list will be the location of the head and the last element, the tail. A point is just x, y values on a grid and for that, we’ll use dart’s `Point` class (imported from `dart:math`).

We also need a `direction` to represent in which direction the snake is moving, this can also be represented using a `Point` object since we just need to update the `head` of the snake along a certain axis, i.e. certain x, y values. We can add these directions to the constants and define our snake:

```dart
class Constants {
  // Canvas
  static const double canvasSize = 500;
  static const double blockSize = 10;

  // Directions
  static const up = Point(0, -1);
  static const down = Point(0, 1);
  static const right = Point(1, 0);
  static const left = Point(-1, 0);
}

class Snake {
  List<Point<int>> snake = [const Point(0, 0)];
  Point<int> direction = Constants.right;

  Point<int> get head {
    return snake[0];
  }
}
```

Now, we can add a snake object to our `GameState` along with the food, which also can be just a `Point`. In the below code, we introduce some things:

-   `random`: To generate random numbers (random food locations).
-   `initGame`: To initialize the Snake object and food location.
-   `foodUpdate`: To update food location.

```dart
class _GameState extends State<Game> {
	late Snake snake;
	late Point<int> food;
	Random random = Random();

	@override
	void initState() {
	  initGame();
	  super.initState();
	}

	initGame() {
	  snake = Snake();
	  foodUpdate();
	}

	void foodUpdate() {
	  food = Point(random.nextInt(Constants.canvasSize ~/ Constants.blockSize),
	      random.nextInt(Constants.canvasSize ~/ Constants.blockSize));
	}

	@override
	Widget build(BuildContext context) {
	  return Container(
	    width: Constants.canvasSize,
	    height: Constants.canvasSize,
	    color: Colors.black,
	  );
	}
}
```

Now we are more or less done with the foundation code, we just need to paint the snake and food on the canvas. For that, we’ll use `Stack` and `Positioned` Widgets. `Positioned` puts a widget to provided locations in a `Stack`. We’ll use the properties, `top` and `left` to set `y` and `x` of the widget respectively.

```dart
Widget build(BuildContext context) {
  return Container(
    width: Constants.canvasSize,
    height: Constants.canvasSize,
    color: Colors.black,
    child: Stack(
      children: snake.snake
              .map((e) => Positioned(
                    top: Constants.blockSize * e.y,
                    left: Constants.blockSize * e.x,
                    child: Container(
                      height: Constants.blockSize,
                      width: Constants.blockSize,
                      color: Colors.green,
                    ),
                  ))
              .toList() +
          [
            Positioned(
              top: Constants.blockSize * food.y,
              left: Constants.blockSize * food.x,
              child: Container(
                height: Constants.blockSize,
                width: Constants.blockSize,
                color: Colors.red,
              ),
            )
          ],
    ),
  );
}
```

In the above code, we basically created a Positioned Widget for each part of the snake and added a food object as well to that list.

{{< figure align=center src="https://raw.githubusercontent.com/yashlamba/portfolio/master/assets/snake_food_1.png" width="50%" caption="Painting Snake and Food">}}

## Update State

Let’s make the game alive now. We want to periodically update the state of the canvas and for that, we can use `Timer.periodic` (imported from `dart:async`) which calls a function after certain `Duration` periodically.

We can add it to the `initState` which gets called once our game starts. We also need an update function, which is passed as a callback to `Timer.periodic` and is responsible for updating the game state.

Before implementing this `gameUpdate` function, let’s see what we actually need to update:

-   Move the snake in a particular direction
-   Check if the snake’s head overlaps with food
    -   if yes, eat food, add length to the snake, and call `foodUpdate`
-   Check if the snake’s head overlapped with any other body part, if yes, reset the game.

Implementation (added to GameState):

```dart
@override
void initState() {
  initGame();
  Timer.periodic(const Duration(milliseconds: 50), (t) {
    gameUpdate();
  });
  super.initState();
}

void gameUpdate() {
  // update this
  if (food == snake.head) {
    snake.eatFood();
    foodUpdate();
  } else {
    snake.update();
  }
  if (snake.didBiteItself()) {
    initGame();
  }
  setState(() {});
}
```

Added to Snake Class:

```dart
bool didBiteItself() {
  for (int i = 1; i < snake.length; i++) {
    if (snake[i] == head) {
      return true;
    }
  }
  return false;
}

void update() {
  // For moving in a direction, move all body parts to the location of the
  // part before them
  for (int i = snake.length - 1; i > 0; --i) {
    snake[i] = snake[i - 1];
  }
  // Then update in the direction snake is moving
	// Mod 50 because, we want the snake to wrap when hitting a wall
  snake[0] = Point((head.x + direction.x) % 50, (head.y + direction.y) % 50);
}

void eatFood() {
  // Since food is added to the end and snake would ultimately
  // Update one position, save the last location and append it again.
  var foodLoc = snake.last;
  update();
  snake.add(foodLoc);
}
```

At this point, our game starts working (not controllable though). One bug I would like to address is that our `foodUpdate` might add the food on the snake's body, so let's add a check for that.

```dart
// In the Stateful Widget
void foodUpdate() {
  do {
    food = Point(random.nextInt(Constants.canvasSize ~/ Constants.blockSize),
        random.nextInt(Constants.canvasSize ~/ Constants.blockSize));
  } while (snake.pointOnSnake(food));
}

// In the snake class
bool pointOnSnake(Point<int> point) {
  for (Point body in snake) {
    if (body == point) {
      return true;
    }
  }
  return false;
}
```

Another interesting thing in the above code is `snake[0] = Point((head.x + direction.x) % 50, (head.y + direction.y) % 50);` this line is really interesting on how it handles negative x, y cases (read about mod with negative numbers).

{{< rawhtml >}}

  <iframe style="width:100%;height:600px;" src="https://dartpad.dev/embed-flutter.html?id=8b5aa009b69df40291ef5df88316c9f2&split=1&theme=dark"></iframe>
{{< /rawhtml >}}

## Controls

We are pretty much done now, we just need to be able to control the snake, that’s it. I understand the chronology of this is a bit weird and we should have done this before the whole eat food logic, but having implemented the snake game quite a bit, I usually do this at the end.

This part doesn’t need much explanation, just two things are sufficient I guess:

-   We are using `RawKeyboardListener` widget with `autofocus` set to true (so that we don’t have to tap it to take control). We’ll also define a `keyHandler` function to handle the events by the listener. (`LogicalKeyboardKey` is imported from `flutter/services.dart`)
-   Two edge/additional cases I would like to address:
    1. We don’t allow the snake to go in the direct opposite direction.
    2. We don’t call `setState` because regardless, it would be called within max `50 ms`; We CAN call it but it won’t make much of a difference.

```dart
void keyHandler(RawKeyEvent event) {
  if (event.logicalKey == LogicalKeyboardKey.arrowDown) {
    if (snake.direction != Constants.up) {
      snake.direction = Constants.down;
    }
  } else if (event.logicalKey == LogicalKeyboardKey.arrowUp) {
    if (snake.direction != Constants.down) {
      snake.direction = Constants.up;
    }
  } else if (event.logicalKey == LogicalKeyboardKey.arrowRight) {
    if (snake.direction != Constants.left) {
      snake.direction = Constants.right;
    }
  } else if (event.logicalKey == LogicalKeyboardKey.arrowLeft) {
    if (snake.direction != Constants.right) {
      snake.direction = Constants.left;
    }
  }
}

@override
Widget build(BuildContext context) {
  return RawKeyboardListener(
    focusNode: FocusNode(),
    onKey: keyHandler,
    autofocus: true,
    child: Container(
      width: Constants.canvasSize,
      height: Constants.canvasSize,
      color: Colors.black,
      child: Stack(
        children: snake.snake // Update This
                .map((e) => Positioned(
                      top: Constants.blockSize * e.y,
                      left: Constants.blockSize * e.x,
                      child: Container(
                        height: Constants.blockSize,
                        width: Constants.blockSize,
                        color: Colors.green,
                      ),
                    ))
                .toList() +
            [
              Positioned(
                top: Constants.blockSize * food.y,
                left: Constants.blockSize * food.x,
                child: Container(
                  height: Constants.blockSize,
                  width: Constants.blockSize,
                  color: Colors.red,
                ),
              )
            ],
      ),
    ),
  );
}
```

Voila! Our game is ready. Try it below:

{{< rawhtml >}}

  <iframe style="width:100%;height:600px;" src="https://dartpad.dev/embed-flutter.html?id=7382e974f847b6361cf7159e6890a209&split=1&theme=dark"></iframe>
{{< /rawhtml >}}

## Follow Ups

-   This implementation still has a few IO bugs which can lead to snake dying (hint: the way we load frames and update direction). We can use an input queue to fix that.
-   Haven't implemented score because it's trivial for this game.
-   A good follow up project would be to implement a multiplayer version of this.

> This project is quite simple and probaly not blog worthy, but I wrote it anyways because, it was fun and I wanted an easy writeup to get out of my writing rut:)

---

{{< rawhtml >}}

<fieldset>
  <legend>Links</legend>
  <ul>
    <li><b>Source</b>: <a href="https://gist.github.com/yashlamba/7382e974f847b6361cf7159e6890a209"><code>Snake Game</code></a></li>
    <li><b>DartPad</b>: <a href="https://dartpad.dev/?id=7382e974f847b6361cf7159e6890a209"><code>Play Snake Game</code></a></li>
  </ul>
</fieldset>

{{< /rawhtml >}}
