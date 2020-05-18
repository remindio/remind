class Api::V1::NoteController < ApplicationController
  def create
    @note = Note.new(environment_id: params[:environment_id])

    if @note.save
      render_response("success", "OK!")
    else
      render_response("error", "Failed while creating a task list")
    end
  end

  def update
    @note = Note.find(params[:id])

    if @note.update(note_params)
      render_response("success", "OK!")
    else
      render_response("error", "Try again!")
    end
  end

  def destroy
    @note = Note.find(params[:id])
    
    if @note.destroy
      render_response("success", "OK!")
    else
      render_response("error", "Try again!")
    end
  end

  private
    def note_params
      params.permit(:title, :description)
    end
end
