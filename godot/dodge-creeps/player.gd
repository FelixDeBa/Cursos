extends Area2D
signal hit
@export var speed = 400
var screen_size

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	screen_size = get_viewport_rect().size
	
	#Evita que se vea el jugador cuando inicia la pantalla
	hide()

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	var velocity = Vector2.ZERO
	if Input.is_action_pressed("move_right"):
		velocity.x +=1
	if Input.is_action_pressed("move_left"):
		velocity.x -=1
	if Input.is_action_pressed("move_down"):
		velocity.y +=1
	if Input.is_action_pressed("move_up"):
		velocity.y -=1
		
	if velocity.length() > 0:
		velocity = velocity.normalized() * speed
		$AnimatedSprite2D.play()
	else:
		$AnimatedSprite2D.stop()
	
	position += velocity * delta
	position = position.clamp(Vector2.ZERO, screen_size)
	#start(position)
	
	
	#Hace las rotaciones en horizontal y vertical de las animaciones
	if velocity.x != 0:
		$AnimatedSprite2D.animation = "walk"
		#$AnimatedSprite2D.rotation = deg_to_rad(270) if velocity.x > 0 else deg_to_rad(90)
		$AnimatedSprite2D.flip_h = false
		$AnimatedSprite2D.flip_h = velocity.x < 0
	elif velocity.y != 0:
		$AnimatedSprite2D.animation = "up"
		#$AnimatedSprite2D.rotation = deg_to_rad(180) if velocity.x > 0 else deg_to_rad(0)
		$AnimatedSprite2D.flip_v = velocity.y > 0
	#else:
		#$AnimatedSprite2D.rotation = deg_to_rad(0)
		

#Esta funcion se ejecuta siempre que hay una colision de un objeto con el jugador
func _on_body_entered(body: Node2D) -> void:
	#Borra al jugador de la escena cuando es golpeado
	hide()
	hit.emit()
	$CollisionShape2D.set_deferred("disabled", true)
	
func start(pos):
	position = pos
	show()
	$CollisionShape2D.disabled = false