class StudentsController < ApplicationController
	def index
		@students=Student.all
		respond_to do |format|

 			# format.html 
 			format.json { render :json => @students, :stauts => :ok}
 		end
	end
	def show
		begin
		@student=Student.find(params[:id])
		respond_to do |format|

 			# format.html 
 			format.json { render :json => @student, :stauts => :ok}
 		end
		
		 rescue => e
		 	p e.message
		 	respond_to do |format|
				# format.html 
 				format.json { render :json => { "error" => e.message}, :status => :unprocessable_entity}
 			end
		  end
	end
	def new
		@student=Student.new()
		respond_to do |format|

 		# format.html 
 			format.json { render :json => @student, :stauts => :ok}
 		end
	end
	def edit 
	 	@student = Student.find(params[:id])
	 	respond_to do |format|

 			# format.html 
 			format.json { render :json => @student, :stauts => :ok}
 		end
	 end
	def create
		@student = Student.new(student_param)
		
		if @student.save
			respond_to do |format|
				# format.html {render 'show'}
 				format.json {render :json => @student, :status  => :ok}
 			end
		else
			respond_to do |format|
				# format.html {render 'new'}
 				format.json {render :json => @student.errors, :status  => :unprocessable_entity}
 			end
		end
	end
	def update
		begin
		@student=Student.find(params[:id])
		if @student.update_attributes(student_param)
			respond_to do |format|
				# format.html {render 'show'}
 				format.json {render :json => @student, :status => :ok}
 			end
		else
			respond_to do |format|
				# format.html {render 'new'}
 				format.json {render :json => @student.errors, :status  => :unprocessable_entity}
			end
		end
		rescue => e
			p e.message
			respond_to do |format|
				# format.html {render 'new'}
 				format.json {render :json => {"error" => e.message}, :status => :unprocessable_entity}
 			end
		end
	end
	def destroy
		p params[:id]
		begin
			@student=Student.find(params[:id])
			
			if @student.destroy
				@students = Student.all
				 respond_to do |format|
					# format.html {render 'index'}
 					format.json {render :json => @student, :status => :ok}
 			end
			
			end
		rescue => e
			p e.message
			respond_to do |format|
				# @students = Student.all
				# format.html {render 'index'}
 				format.json {render :json => {"error" => e.message}, :status => :unprocessable_entity}
 			end
		end
	end
	
	def filtered_index
    # refactor this to generate dynamic query
    begin

      @students = Student.where(:classroom_id => params[:classroom_id])
     
 			   render :json => @students.to_json(:methods => [:classroom, :subject_details, :school_details]), :status => :ok
		# end
		rescue => e
			p e.message
			respond_to do |format|

 				# format.html 
 				format.json {render :json =>  { "error" => e.message}, :status  => :unprocessable_entity}
 			end
	  end
  end

	private
	def student_param
		 params.require(:student).permit(:name, :father_name, :mother_name, :phone_no, :address, :city, :zipcode, :state, :school_id, :classroom_id)
	end	

	
end



