extends Node

@export var mob_scene: PackedScene
var score

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass


func game_over() -> void:
	$ScoreTimer.stop()
	$MobTimer.stop()
	$HUD.show_game_over()
	$Music.stop()
	$DeathSound.play()
	print("Perdiste :c")
	
	
func new_game():
	score = 0
	$Player.start($StartPosition.position)
	$StartTimer.start()
	$HUD.update_score(score)
	$HUD.show_message("Get Ready")
	get_tree().call_group("mobs", "queue_free")
	$Music.play()
	print("Empezamos")


func _on_score_timer_timeout() -> void:
	score += 1
	$HUD.update_score(score)


func _on_start_timer_timeout() -> void:
	$MobTimer.start()
	$ScoreTimer.start()
	

func _on_mob_timer_timeout() -> void:
	var mob = mob_scene.instantiate()
	#Elegir una ubicacion aleatoria dentro del camino
	var mob_spawn_location = $MobPath/MobSpawnLocation
	mob_spawn_location.progress_ratio = randf()
	
	#Hacer que la direccion sea perpendicular al camino
	var direction = mob_spawn_location.rotation + PI / 2
	
	#Posicion inicial aleatoria
	mob.position = mob_spawn_location.position
	
	# Direccion aleatoria
	direction += randf_range(-PI / 4, PI / 4)
	mob.rotation = direction
	
	#Velocidad aleatoria
	var velocity = Vector2(randf_range(150.0, 250.0), 0.0)
	mob.linear_velocity = velocity.rotated(direction)
	
	#Se crea al mob dentro de la escena
	add_child(mob)