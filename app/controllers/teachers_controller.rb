class TeachersController < ApplicationController
	def index
		@teacher=Teacher.all
		render :json => @teacher
	end
	def show
		begin
		@teacher =Teacher.find(params[:id])
		#if @teacher
			render :json => @teacher, :status  => :ok
		#else
		#	render :json => @teacher.errors, :status  => :unprocessable_entity
		#end
		rescue => e
			p e.message
			render :json =>  { "error" => e.message}, :status  => :unprocessable_entity
		end
	end
	def new
		@teacher = Teacher.new()
	end
	def edit 
	 	@teacher = Teacher.find(params[:id])
	 end
	def create
		@teacher=Teacher.new(teacher_param)
		if @teacher.save
			render :json => @teacher, :status  => :ok
		else
			render :json => @teacher.errors, :status  => :unprocessable_entity
		end
	end
	def update
		begin
		@teacher=Teacher.find(params[:id])
		if @teacher.update_attributes(teacher_param)
			render :json => @teacher, :status  => :ok
		else
			render :json => @teacher.errors, :status  => :unprocessable_entity
		end
		rescue => e
			p e.message
			render :json => { "error" => e.message}, :status  => :unprocessable_entity
		end
	end
	
	
	def destroy
		begin
		@teacher=Teacher.find(params[:id])
		if @teacher.destroy
			render :json => @teacher, :status  => :ok
		else
			render :json => @teacher.errors, :status  => :unprocessable_entity
		end
		rescue => e
			p e.message
			render :json => {"error" => e.message}, :status  => :unprocessable_entity
		end
	end
	private 
	def teacher_param
		 params.require(:teacher).permit(:name, :proficiency_subject, :gender, :phone_no, :school_id)
	end	
end
