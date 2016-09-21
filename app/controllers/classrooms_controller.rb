class ClassroomsController < ApplicationController
	def index
		@classroom=Classroom.all
		render :json => @classroom
	end
	def show
		begin
		@classroom = Classroom.find(params[:id])
		#if @classroom
			render :json => @classroom, :status => :ok
		# else
		# 	render :json => @classroom.errors, :status  => :unprocessable_entity
		# end
		rescue => e
			p e.message
			render :json =>  { "error" => e.message}, :status  => :unprocessable_entity
		end
	end
	def new
		@classroom= Classroom.new()
	end
	 def edit 
	 	@classroom = Classroom.find(params[:id])
	 end
	def create
		
		 @classroom = Classroom.new(classroom_param)
		 if @classroom.save
      		render json: @classroom, :status => :ok
    	 else
    		render :json => @classroom.errors, :status  => :unprocessable_entity
      	end
	end
	def update
		begin
		@classroom = Classroom.find(params[:id])
		if @classroom.update_attributes(classroom_param)
			render :json => @classroom, :status  => :ok
		else
			render :json => @classroom.errors, :status  => :unprocessable_entity
		end
	    rescue => e
	    	p e.message
			render :json => {"error" => e.message}, :status  => :unprocessable_entity
		end
	end
	def destroy
		begin
		@classroom = Classroom.find(params[:id])
	   if @classroom.destroy
	      render :json => @classroom, :status  => :ok
	   
	   else
	   	render :json => @classroom.errors ,:status => :unprocessable_entity
	   end
	   rescue => e
	   	  p e.message
       	  render :json => {"error" => e.message}, :status  => :unprocessable_entity
       end
	end
	private 
	def classroom_param
		 params.require(:classroom).permit(:name, :number_of_students, :school_id)
	end	
	
end
