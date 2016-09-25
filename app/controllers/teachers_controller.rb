class TeachersController < ApplicationController
	def index
		@teachers=Teacher.all
		respond_to do |format|

 				format.html 
 				format.json { render :json => @teacher, :status  => :ok }
 			end	
	end
	def show
		begin
		@teacher =Teacher.find(params[:id])
			respond_to do |format|

 				format.html 
 				format.json { render :json => @teacher, :status  => :ok }
 			end	
		
		rescue => e
			p e.message
			respond_to do |format|

 			format.html 
 			format.json { render :json =>  { "error" => e.message}, :status  => :unprocessable_entity}
			end
		end
	end
	def new
		@teacher = Teacher.new()
		respond_to do |format|

 				format.html 
 				format.json { render :json => @teacher, :status  => :ok }
 			end	
	end
	def edit 
	 	@teacher = Teacher.find(params[:id])
	 	respond_to do |format|

 				format.html 
 				format.json { render :json => @teacher, :status  => :ok }
 			end	
	 end
	def create
		
		# @teacher=Teacher.new(teacher_param)
		@teacher = Teacher.new(params.require(:teacher).permit(:name, :proficiency_subject, :gender, :phone_no, :school_id).merge(:classroom_ids=>params[:teacher][:classroom_ids]))

		if @teacher.save
			respond_to do |format|

 				format.html {render 'show'}
 				format.json { render :json => @teacher, :status  => :ok}
			end

		else
			respond_to do |format|

 				format.html {render 'new'}
 				format.json {render :json => @teacher.errors, :status  => :unprocessable_entity}
 			end
		end
	end
	def update
		begin
		@teacher=Teacher.find(params[:id])
		if @teacher.update_attributes(teacher_param)
			respond_to do |format|

 				format.html {render 'show'}
 				format.json { render :json => @teacher, :status  => :ok}
			end
		else
			respond_to do |format|

 				format.html {render 'new'}
 				format.json {render :json => @teacher.errors, :status  => :unprocessable_entity}
 			end
		end
		rescue => e
			p e.message
			respond_to do |format|

 				format.html {render 'new'}
 				format.json {render :json => { "error" => e.message}, :status  => :unprocessable_entity}
 			end
		end
	end
	
	
	def destroy
		begin
		@teacher=Teacher.find(params[:id])
		if @teacher.destroy
			respond_to do |format|
				@teachers = Teacher.all
 				format.html {render 'index'}
 				format.json { render :json => @teacher, :status  => :ok}
			end
		
		end
		rescue => e
			p e.message
			respond_to do |format|
				@teachers = Teacher.all
 				format.html {render 'index'}
 				format.json {render :json => { "error" => e.message}, :status  => :unprocessable_entity}
 			end
		end
	end
	private 
	def teacher_param
		 params.require(:teacher).permit(:name, :proficiency_subject, :gender, :phone_no, :school_id)
	end	
end
